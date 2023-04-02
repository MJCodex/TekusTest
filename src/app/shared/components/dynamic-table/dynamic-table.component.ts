import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.sass']
})
export class DynamicTableComponent<T> implements OnInit {
  @Input() data: any;
  @Input() displayedColumns: any;
  columns!: Array<any>
  dataSource: any

  ngOnInit() {
    // Get list of columns by gathering unique keys of objects found in DATA.
    const columns = this.data
      .reduce((columns: any, row: any) => {
        return [...columns, ...Object.keys(row)]
      }, [])
      .reduce((columns:any, column: any) => {
        return columns.includes(column)
          ? columns
          : [...columns, column]
      }, [])
    // Describe the columns for <mat-table>.
    this.columns = columns.map((column: any) => {
      return {
        columnDef: column,
        header: column,
        cell: (element: any) => `${element[column] ? element[column] : ``}`
      }
    })
    this.displayedColumns = this.columns.map(c => c.columnDef);
    // Set the dataSource for <mat-table>.
    this.dataSource = this.data
  }
}
