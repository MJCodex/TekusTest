import { Component } from '@angular/core';
import {GetSubscribersService} from "./services/get-subscribers.service";
import {DeleteSubscribersService} from "./services/delete-subscribers.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tekus-test';
  constructor(
    private _login: LoginService,
  ) {
  }
  logout(): void {
    this._login.logout();
  }
}

