import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsHandlerComponent } from './errors-handler.component';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    ErrorsHandlerComponent
  ],
  exports: [
    ErrorsHandlerComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ]
})
export class ErrorsHandlerModule { }
