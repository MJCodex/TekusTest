import { Component } from '@angular/core';
import { ToastPackage, Toast, ToastrService } from 'ngx-toastr';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      transition('inactive => active',
        animate('300ms ease-out',
          keyframes([
            style({
              opacity: 0,
              bottom: '-15px',
              'max-height': 0,
              'max-width': 0,
              'margin-top': 0
            }),
            style({
              opacity: 0.8,
              bottom: '-3px'
            }),
            style({
              opacity: 1,
              bottom: '0',
              'max-height': '200px',
              'margin-top': '12px',
              'max-width': '400px'
            })
          ])
        )
      ),
      state('active',
        style({
          bottom: '0',
          'max-height': '200px',
          'margin-top': '12px',
          'max-width': '400px'
        })
      ),
      transition('active => removed',
        animate(
          '300ms ease-out',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateY(0)'
            }),
            style({
              opacity: 0,
              transform: 'translateY(25%)'
            })
          ])
        )
      )
    ])
  ]
})
export class NotificationsComponent extends Toast {

  constructor(
    protected toastrService: ToastrService,
    public notification: ToastPackage
  ) {
    super(toastrService, notification);
  }

}
