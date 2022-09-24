import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      toastComponent: NotificationsComponent,
      newestOnTop: false,
      preventDuplicates: true,
      autoDismiss: true,
      maxOpened: 4
    })
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }
