import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar,
    private _translocoService: TranslocoService
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
    const generalError = this._translocoService.translate('errors.general');
    this._snackBar.open(generalError, '',
      {
        duration: 1500,
      });
    return throwError(error);
  }
}
