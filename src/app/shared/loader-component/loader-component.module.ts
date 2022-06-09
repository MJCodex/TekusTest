import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponentComponent } from './loader-component.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [LoaderComponentComponent],
  exports: [
    LoaderComponentComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LoaderComponentModule { }
