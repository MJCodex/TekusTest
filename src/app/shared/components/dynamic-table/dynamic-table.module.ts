import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicTableComponent} from './dynamic-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from "@angular/cdk/table";
import {MatButtonModule} from "@angular/material/button";
import { CustomColumnDirective } from './custom-column.directive';
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    DynamicTableComponent,
    CustomColumnDirective
  ],
    exports: [
        DynamicTableComponent,
        CustomColumnDirective
    ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatButtonModule,
    MatSortModule
  ]
})
export class DynamicTableModule { }
