import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    protected toastrService: ToastrService,
    private readonly _translocoService: TranslocoService
  ) { }

  /**
   * Abrir notificación
   * @param notification - Determina el tipo, título y mensaje de la notificación
   * @param notification.Key - Determina el tipo de notificación. Las opciones son: error, success, alert o information.
   * @param notification.Title - Título de la notificación.
   * @param notification.Body - Se determina el mensaje a mostrar
   */
  openNotification(notification: Notification) {
    this.processNotification(notification);
  }

  private processNotification = (notification: Notification) => {
    switch (notification.Key) {
      case 'error': {
        notification.TimeOut = 6000;
        notification.ToastClass = 'ark-toast-error';
        notification.CloseButton = true;
        notification.ProgressBar = true;
        notification.DisableTimeOut = false;
        break;
      }
      case 'alert': {
        notification.TimeOut = 6000;
        notification.ToastClass = 'ark-toast-alert';
        notification.CloseButton = true;
        notification.ProgressBar = true;
        notification.DisableTimeOut = false;
        break;
      }
      case 'success': {
        notification.TimeOut = 3000;
        notification.ToastClass = 'ark-toast-success';
        notification.CloseButton = true;
        notification.ProgressBar = true;
        notification.DisableTimeOut = false;
        break;
      }
      case 'information': {
        notification.TimeOut = 15000;
        notification.ToastClass = 'ark-toast-information';
        notification.CloseButton = true;
        notification.ProgressBar = true;
        notification.DisableTimeOut = false;
        break;
      }
      case 'informationWithHtml': {
        notification.TimeOut = 0;
        notification.ToastClass = 'ark-toast-information';
        notification.CloseButton = false;
        notification.ProgressBar = false;
        notification.DisableTimeOut = true;
        notification.enableHtml = true;
        break;
      }
    }

    this.toastrService
      .show(
        notification.Body,
        notification.Title,
        {
          timeOut: notification.TimeOut,
          toastClass: notification.ToastClass,
          closeButton: notification.CloseButton,
          progressBar: notification.ProgressBar,
          positionClass: 'toast-bottom-right',
          disableTimeOut: notification.DisableTimeOut,
          extendedTimeOut: notification.TimeOut,
          onActivateTick: true,
          enableHtml: notification.enableHtml ? notification.enableHtml : false
        });
  }

  successNotification(titleKey: string = 'general.Success', bodyKey: string, interpolateParams?: any) {
    const notification: Notification = {
      Title: this._translocoService.translate(titleKey),
      Body: this._translocoService.translate(bodyKey, interpolateParams || ''),
      Key: 'success'
    };
    this.openNotification(notification);
  }

  errorNotification(titleKey: string = 'general.Error', body: string) {
    const notification: Notification = {
      Title: this._translocoService.translate(titleKey),
      Body: body,
      Key: 'error'
    };
    this.openNotification(notification);
  }

  alertNotification(title: string = 'general.Alert', body: string, interpolateParams?: any) {
    const notificacion: Notification = {
      Title: this._translocoService.translate(title),
      Body: this._translocoService.translate(body, interpolateParams || ''),
      Key: 'alert'
    };
    this.openNotification(notificacion);

  }

  infoNotificationWithHtml(title: string = 'general.Information', body: string) {
    const notificacion: Notification = {
      Title: this._translocoService.translate(title),
      Body: body,
      Key: 'informationWithHtml'
    };
    this.openNotification(notificacion);
  }

  infoNotification(titleKey: string = 'general.Information', bodyKey: string) {
    const notification: Notification = {
      Title: this._translocoService.translate(titleKey),
      Body: this._translocoService.translate(bodyKey),
      Key: 'information'
    };
    this.openNotification(notification);
  }
}
