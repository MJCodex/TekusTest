import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class DeleteSubscribersService {

    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    async run(id: string | number): Promise<void> {
        await this._httpClient.delete(`${environment.api}subscribers/${id}`).toPromise();
    }
}
