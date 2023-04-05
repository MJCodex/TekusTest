import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SubscribersApiModel} from "../shared/models/subscribers-api.model";

@Injectable({
  providedIn: 'root'
})
export class CreateOrUpdateSubscribersService {
  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  async run(data: SubscribersApiModel, id?: string | number): Promise<void> {
    id ? await this.update(data, id) : await this.create(data);
  }

  private async create(data: SubscribersApiModel): Promise<void> {
    await this._httpClient.post(`${environment.api}subscribers`, data).toPromise();
  }

  private async update(data: SubscribersApiModel, id: string | number): Promise<void> {
    await this._httpClient.put(`${environment.api}subscribers/${id}`, data).toPromise();
  }
}
