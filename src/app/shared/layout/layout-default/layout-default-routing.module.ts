import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersComponent } from '../../../pages/subscribers/subscribers.component';
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
        component: SubscribersComponent,
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
