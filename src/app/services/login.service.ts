import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  async run(data: any): Promise<any> {
    return await this._httpClient.post(`${environment.api}account/login`, data).toPromise();
    //return this._httpClient.post<any[]>(`${environment.api}/account/login`, data).toPromise();
  }
}
