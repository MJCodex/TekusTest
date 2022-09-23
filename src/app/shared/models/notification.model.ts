export interface Notification {
  Key: string;
  Title: string;
  Body: string;
  TimeOut?: number;
  ToastClass?: string;
  CloseButton?: boolean;
  ProgressBar?: boolean;
  DisableTimeOut?: boolean | 'timeOut' | 'extendedTimeOut';
  enableHtml?: boolean;
}
