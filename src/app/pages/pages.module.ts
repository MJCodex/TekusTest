import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscribersComponent, TestComponent} from './subscribers/subscribers.component';
import { SubscribersFormComponent } from '../components/subscribers-form/subscribers-form.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutDefaultModule } from '../shared/layout/layout-default/layout-default.module';
import { ErrorsHandlerModule } from '../shared/components/errors-handler/errors-handler.module';
import { LoaderComponentModule } from '../shared/components/loader-component/loader-component.module';
import { DynamicTableModule } from '../shared/components/dynamic-table/dynamic-table.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormControlPipeModule } from '../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    SubscribersComponent,
    SubscribersFormComponent,
    ConfirmDialogComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    TranslateModule,
    MatIconModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDialogModule,
    PagesRoutingModule,
    LayoutDefaultModule,
    ErrorsHandlerModule,
    LoaderComponentModule,
    DynamicTableModule,
    FormControlPipeModule
  ]
})
export class PagesModule { }
