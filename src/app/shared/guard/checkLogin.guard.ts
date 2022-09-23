import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(
    private _login: LoginService,
    private _router: Router
  ) {
  }

  /**
   * Metodo para saber si el usuario esta autorizado
   * @returns {boolean}
   */
  canActivate(): boolean {
    const status = this._login.isLogged();
    if (status) {
      return status;
    } else {
      this._router.navigateByUrl('/login');
      return status;
    }
  }

}
