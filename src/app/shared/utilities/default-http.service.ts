import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";


export interface CustomHttpParams {
  [key: string]: string | number | any;
}

@Injectable({
  providedIn: 'root'
})
export class DefaultHttpService {
  public objectToHttpParams(customHttpParams: CustomHttpParams, httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    for (const [key, value] of Object.entries(customHttpParams)) {
      if (Array.isArray(value)) {
        value.map((keyOfValue, index: number): void => {
          if (index === 0) {
            httpParams = httpParams?.set(key, keyOfValue);
          } else {
            httpParams = httpParams?.append(key, keyOfValue);
          }
        });

      } else {
        if (value !== null && value !== '') {
          httpParams = httpParams.set(key, value);
        }
      }
    }
    return httpParams;
  }
}
