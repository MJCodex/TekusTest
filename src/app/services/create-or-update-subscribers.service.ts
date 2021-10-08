import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreateOrUpdateSubscribersService {
  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  async run(data: any, id?: string | number): Promise<void> {
    if (id) {
      await this.update(data, id);
    } else {
      await this.create(data);
    }
  };
  private async create(data: any): Promise<void> {
    await this._httpClient.post(`${environment.api}subscribers`, data).toPromise();
  }

  private async update(data: any, id: string | number): Promise<void> {
    await this._httpClient.put(`${environment.api}subscribers/${id}`, data).toPromise();
  }
}
