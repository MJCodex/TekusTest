import { Component } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-layout-default-nav-bar',
  templateUrl: './layout-default-nav-bar.component.html',
  styleUrls: ['./layout-default-nav-bar.component.sass']
})
export class LayoutDefaultNavBarComponent {
  title = 'MJCodex Tekus Test';
  login: boolean = false;

  constructor(
    private _login: LoginService,
    private _translocoService: TranslocoService
  ) {
  }

  logout(): void {
    this._login.logout();
  }

  changeLang(lang: string): void {
    this._translocoService.setActiveLang(lang);
  }

  isLogin(): boolean {
    return this._login.isLogged();
  }

}
