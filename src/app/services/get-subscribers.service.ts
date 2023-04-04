import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiResponseModel} from "../shared/models/api-response.model";
import {SubscribersApiModel} from "../shared/models/subscribers-api.model";

@Injectable({
  providedIn: 'root'
})
export class GetSubscribersService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  async run(data: any): Promise<ApiResponseModel<SubscribersApiModel[]>> {
    return await this._httpClient.get<ApiResponseModel<SubscribersApiModel[]>>(`${environment.api}subscribers`, {params: data}).toPromise();
  }
}
