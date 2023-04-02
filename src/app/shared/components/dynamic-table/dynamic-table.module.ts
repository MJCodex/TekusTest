import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicTableComponent} from './dynamic-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from "@angular/cdk/table";


@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  exports: [
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule
  ]
})
export class DynamicTableModule { }
