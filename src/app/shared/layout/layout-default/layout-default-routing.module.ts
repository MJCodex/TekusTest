import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from '../../guard/checkLogin.guard';
import { LayoutDefaultComponent } from './layout-default.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [CheckLoginGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../../pages/pages.module').then(m => m.PagesModule),
        canActivate: [CheckLoginGuard]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutDefaultRoutingModule {
}
