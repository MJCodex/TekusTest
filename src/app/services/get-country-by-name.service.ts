import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {DefaultHttpService} from "../shared/utilities/default-http.service";
import {ApiCountriesModel} from "../shared/models/api-countries.model";

@Injectable({
  providedIn: 'root'
})
export class GetCountryByNameService {

  constructor(
    private _httpClient: HttpClient,
    private _defaultHttpService: DefaultHttpService
  ) {
  }

  async run(paramsObj: { [key: string]: string }, countryName: string): Promise<ApiCountriesModel[]> {
    const params: HttpParams = this._defaultHttpService.objectToHttpParams(paramsObj);
    return await this._httpClient.get<ApiCountriesModel[]>(`https://restcountries.com/v3.1/name/${countryName}`, {params}).toPromise();
  }
}
