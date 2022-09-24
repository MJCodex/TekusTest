import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren, Input,
  OnChanges,
  QueryList, ViewChild
} from '@angular/core';
import { DynamicColumnComponent } from './dynamic-column/dynamic-column.component';
import { MatColumnDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.sass']
})
export class DynamicTableComponent<T> implements OnChanges, AfterContentInit {
  @ContentChildren(DynamicColumnComponent) dynColumns!: QueryList<DynamicColumnComponent<T>>;
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
  @ContentChild(MatHeaderRowDef) headerRowDef!: MatHeaderRowDef;
  @ContentChildren(MatRowDef) rowDefs!: QueryList<MatRowDef<T>>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ContentChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<T>;
  @Input() displayedColumns: any;
  @Input() data: any;
  public dataSource = new MatTableDataSource([]);

  ngOnChanges() {
    if (this.data) {
      this.setData(this.data);
    }
  }

  ngAfterContentInit() {
    this.dynColumns.forEach(dynColumn => this.table.addColumnDef(dynColumn.columnDef));
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
  }

  setData(data: never[]) {
    console.log(data);
    if (Array.isArray(data)) {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
