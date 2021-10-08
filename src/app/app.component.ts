import { Component } from '@angular/core';
import {GetSubscribersService} from "./services/get-subscribers.service";
import {DeleteSubscribersService} from "./services/delete-subscribers.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "./services/login.service";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
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
    return  this._login.isLoged();
  }
}

