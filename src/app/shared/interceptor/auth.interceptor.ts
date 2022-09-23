import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { NotificationsService } from '../utilities/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _translocoService: TranslocoService,
    private _notificationsService: NotificationsService
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
      newReq = newReq.clone({
        headers: newReq.headers.set('Authorization', 'Bearer ' + token),
      });
    } catch (e) {
    }
    return next.handle(newReq).toPromise().catch(error => {
      this.errorHandle(error);
    });
  }

  errorHandle(error: HttpErrorResponse) {
    this._notificationsService.errorNotification('errors.Error', 'errors.general')
    return throwError(error);
  }
}
