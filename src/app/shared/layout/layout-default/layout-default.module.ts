import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultComponent } from './layout-default.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { LayoutDefaultFooterComponent } from './layout-default-footer/layout-default-footer.component';
import { LayoutDefaultNavBarComponent } from './layout-default-nav-bar/layout-default-nav-bar.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent
  }
];


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
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutDefaultModule { }
