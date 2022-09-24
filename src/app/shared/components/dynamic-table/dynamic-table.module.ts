import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { DynamicColumnComponent } from './dynamic-column/dynamic-column.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DynamicTableComponent,
    DynamicColumnComponent
  ],
  exports: [
    DynamicTableComponent,
    DynamicColumnComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class DynamicTableModule { }
