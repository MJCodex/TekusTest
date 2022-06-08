import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { CheckLoginGuard } from '../shared/guard/checkLogin.guard';


const routes: Routes = [
  {
    path: '',
    component: SubscribersComponent,
    canActivate: [CheckLoginGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
