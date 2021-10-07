import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, from} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(req, next));
    }

    async handle(req: HttpRequest<any>, next: HttpHandler): Promise<any> {
        let newReq = req.clone();

        // Agregando token para autorizacion de la peticion
        try {
            const token = localStorage.getItem('potato-token');
            console.log(token);
            newReq = newReq.clone({
                headers: newReq.headers.set('Authorization', 'Bearer ' + token)
            });
        } catch (e) {
        }
        return next.handle(newReq).toPromise();
    }
}
