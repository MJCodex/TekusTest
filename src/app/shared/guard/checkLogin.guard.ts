import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(
    private _login: LoginService,
    private _router: Router
  ) {
  }
  canActivate():
    Observable<boolean>{
    const status = this._login.isLoged();
    if (status){
      return status;
    } else {
      this._router.navigateByUrl('/login');
      return status;
    }
  }

}
