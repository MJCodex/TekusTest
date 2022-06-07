import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guard/checkLogin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CheckLoginGuard],
    loadChildren: () => import('./shared/layout/layout-default/layout-default.module').then(m => m.LayoutDefaultModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
