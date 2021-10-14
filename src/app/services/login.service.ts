import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
  }

  async login(data: any): Promise<any> {
    return await this._httpClient.post(`${environment.api}account/login`, data).toPromise()
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

  isLogged (): any {
    return localStorage.getItem('potato-token') ? true : false;
  }
}
