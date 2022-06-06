import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultComponent } from './layout-default.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { LayoutDefaultRoutingModule } from './layout-default-routing.module';
import { LayoutDefaultFooterComponent } from './layout-default-footer/layout-default-footer.component';
import { LayoutDefaultNavBarComponent } from './layout-default-nav-bar/layout-default-nav-bar.component';


@NgModule({
  declarations: [
    LayoutDefaultComponent,
    LayoutDefaultFooterComponent,
    LayoutDefaultNavBarComponent
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
