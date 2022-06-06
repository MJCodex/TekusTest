import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.sass']
})
export class LayoutDefaultComponent {
  title = 'tekus-test';
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
