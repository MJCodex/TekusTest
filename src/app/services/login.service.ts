import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
  }

  async login(data: any): Promise<any> {
    return await this._httpClient.post(`${environment.api}account/login`, data).toPromise()
      .then((response: any) => {
        localStorage.setItem('potato-token', response.Token);
        this._router.navigateByUrl('/home');
      }).catch((error) => {
        this._snackBar.open(error.error.error, "",
          {
            duration: 1500,
          });
      })
  }

  async logout (): Promise<void> {
    localStorage.removeItem('potato-token');
    await this._router.navigateByUrl('/login');
    console.log('Salir');
  }

  isLoged (): any {
    return localStorage.getItem('potato-token') ? true : false;
  }
}
