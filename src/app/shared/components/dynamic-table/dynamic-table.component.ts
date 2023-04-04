import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {ConfigColumnsModel} from "../../models/config-columns.model";

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.sass']
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @ViewChildren('componentContainer', {read: ViewContainerRef}) componentContainer!: QueryList<ViewContainerRef>
  @Input() data!: [];
  @Input() configColumns!: ConfigColumnsModel[];
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
  }

  createDynamicComponents(): void {
    let indexContainer: number = 0;
    const columnsKeyObject: { [key: string]: ConfigColumnsModel } = {};
    this.configColumns.forEach((col: ConfigColumnsModel): void => {
      columnsKeyObject[col.objectKey] = col;
    });
    this.data.forEach((row: {}): void => {
      Object.keys(columnsKeyObject).forEach((key: string): void => {
        const col: ConfigColumnsModel = columnsKeyObject[key];
        if (col && col.objectKey === key && indexContainer <= this.componentContainer.length && col.renderComponent) {
          const componentRef: ComponentRef<any> = this.instanceComponent(col.renderComponent.component, indexContainer)
          indexContainer++;
          this.initializeProperties(componentRef, col.renderComponent.properties, row);
        }
      });
    });
    this.changeDetectorRef.detectChanges();
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
  }
}
