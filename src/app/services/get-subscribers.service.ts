import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiResponseModel} from "../shared/models/api-response.model";
import {SubscribersApiModel} from "../shared/models/subscribers-api.model";
import {map} from "rxjs/operators";
import {DefaultHttpService} from "../shared/utilities/default-http.service";

@Injectable({
  providedIn: 'root'
})
export class GetSubscribersService {

  constructor(
    private _httpClient: HttpClient,
    private _defaultHttpService: DefaultHttpService
  ) {
  }

  async run(paramsObj: { [key: string]: string }): Promise<ApiResponseModel<SubscribersApiModel[]>> {
    const params: HttpParams = this._defaultHttpService.objectToHttpParams(paramsObj);
    return await this._httpClient.get<SubscribersApiModel[]>(`${environment.api}subscribers`, {params})
      .pipe(
        map((subscribers: any[]) => {
          const newData: ApiResponseModel<SubscribersApiModel[]> = {
            Count: 200,
            Data: subscribers
          };
          return newData;
        })
      )
      .toPromise();
  }
}
