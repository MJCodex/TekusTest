import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultComponent } from './layout-default.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { LayoutDefaultRoutingModule } from './layout-default-routing.module';


@NgModule({
  declarations: [
    LayoutDefaultComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    TranslocoModule,
    LayoutDefaultRoutingModule,
    MatButtonModule
  ]
})
export class LayoutDefaultModule {
}
