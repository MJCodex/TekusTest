import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetSubscribersService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  async run(data: any): Promise<any> {
    return await this._httpClient.get(`${environment.api}subscribers`, data).toPromise();
    //return this._httpClient.post<any[]>(`${environment.api}/account/login`, data).toPromise();
  }
}
