import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  ContentChildren, EventEmitter,
  Input,
  OnInit, Output,
  QueryList,
  TemplateRef, ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {ConfigColumnsModel} from "../../models/config-columns.model";
import {CustomColumnDirective} from "./custom-column.directive";
import {MatSort, Sort} from "@angular/material/sort";
import {DynamicTableEventsModel} from "../../models/dynamic-table-events.model";

export const dynamicTableEvents: { [key: string]: string } = {
  Sort: 'Sort'
};

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.sass']
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @ContentChild('template') template!: TemplateRef<any>;
  @ContentChildren(CustomColumnDirective) customColumns!: QueryList<CustomColumnDirective>
  @ViewChildren('componentContainer', {read: ViewContainerRef}) componentContainer!: QueryList<ViewContainerRef>
  @Input() data!: [];
  @Input() configColumns!: ConfigColumnsModel[];
  @ViewChild(MatSort) matSort!: MatSort;
  @Output() eventFromDynamicTable: EventEmitter<DynamicTableEventsModel> = new EventEmitter;
  displayedColumns!: string[];

  constructor(
    private resolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.configColumns.map((col: ConfigColumnsModel) => col.displayName);
  }

  getNestedValue(object: any, value: string) {
    return value.split('.').reduce(<T, U extends keyof T>(acc: T, curr: U) => acc?.[curr], object);
  }

  ngAfterViewInit(): void {
    this.createDynamicComponents();
    this.sortingTable();
  }

  sortingTable(): void {
    this.matSort.sortChange.subscribe({
      next: (sort: Sort): void => {
        const sortEvent: DynamicTableEventsModel = {
          KeyEvent: dynamicTableEvents.Sort,
          Data: sort
        };
        this.eventFromDynamicTable.emit(sortEvent);
      }
    });
  }

  createDynamicComponents(): void {
    if (this.componentContainer.length <= 0) return;
    const columnsKeyObject: { [key: string]: ConfigColumnsModel } = {};
    let totalColumns: number = 0;
    this.configColumns.forEach((col: ConfigColumnsModel): void => {
      if (col.renderComponent) {
        columnsKeyObject[col.objectKey] = col;
        totalColumns++;
      }
    });
    this.data.forEach((row: {}, indexRow: number): void => {
      Object.keys(columnsKeyObject).forEach((key: string, indexCol: number): void => {
        const col: ConfigColumnsModel = columnsKeyObject[key];
        const currentComponentIndex: number = this.getContainerIndex(indexRow, indexCol, this.data.length);
        if (col && col.objectKey === key && col.renderComponent) {
          const componentRef: ComponentRef<any> = this.instanceComponent(col.renderComponent.component, currentComponentIndex)
          this.initializeProperties(componentRef, col.renderComponent.properties, row);
        }
      });
    });
    this.changeDetectorRef.detectChanges();
  }

  /**
   * @returns Retorna el índice del container donde se debe insertar el componente
   * @param indexRow Cantidad que se debe agregar al índice del bloque
   * @param indexCol Es el bloque de turno
   * @param blockSize Tamaño de cada bloque dentro del array
   */
  getContainerIndex(indexRow: number, indexCol: number, blockSize: number): number {
    const blockInit: number = blockSize * indexCol;
    return blockInit + indexRow;
  }


  instanceComponent(renderComponent: any, index: number): ComponentRef<any> {
    const cellTemplateRef: ViewContainerRef = this.componentContainer.toArray()[index];
    const componentFactory: ComponentFactory<any> = this.resolver.resolveComponentFactory(renderComponent);
    return cellTemplateRef.createComponent(componentFactory);
  }

  initializeProperties(componentRef: any, properties: any, row: any): void {
    Object.keys(properties).forEach((key: string): void => {
      componentRef.instance[key] = properties[key];
    });
    componentRef.instance.row = row;
    if (properties.emitter) {
      componentRef.instance.eventEmitter?.subscribe((event: DynamicTableEventsModel) => this.eventFromDynamicTable.emit(event));
    }
  }
}
