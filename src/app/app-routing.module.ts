import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guard/checkLogin.guard';
import { LayoutDefaultComponent } from './shared/layout/layout-default/layout-default.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [CheckLoginGuard],
    loadChildren: () => import('./shared/layout/layout-default/layout-default.module').then(m => m.LayoutDefaultModule)
  },
  {
    path: 'login',
    component: LoginComponent
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
