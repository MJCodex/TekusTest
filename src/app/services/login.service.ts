import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import { LoginDataModel } from '../shared/models/login-data.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
  }

  /**
   * Metodo para logueo en la plataforma
   *
   * @param {LoginDataModel} data  Contiene el usuario y clave para la plataforma
   * @returns {Promise<any>} Resuelve la promesa en el retorno
   */
  async login(data: LoginDataModel): Promise<any> {
    let params: HttpParams = new HttpParams().append("Username",data.UserName);
    return await this._httpClient.get(`${environment.api}account/login`, { params }).toPromise()
      .then((response: any) => {
        if(response && response.Token){
          localStorage.setItem('potato-token', response.Token);
          this._router.navigateByUrl('/home');
        }
      });
  }

  async logout (): Promise<void> {
    localStorage.removeItem('potato-token');
    await this._router.navigateByUrl('/login');
  }

  /**
   * Metodo para saber si un usuario esta logueado
   * @returns {boolean}
   */
  isLogged (): boolean {
    return !!localStorage.getItem('potato-token');
  }
}
