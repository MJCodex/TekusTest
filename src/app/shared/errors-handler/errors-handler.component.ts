import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-errors-handler',
  templateUrl: './errors-handler.component.html',
  styleUrls: ['./errors-handler.component.sass']
})
export class ErrorsHandlerComponent {
  @Input() ctrl!: FormControl;

  ERROR_MESSAGE: Record<string, Function> = {
    required: (errorKey: string) => this.translateError(errorKey),
    minlength: (errorKey: string, params: any) => this.translateError(errorKey, params.requiredLength),
    default: (errorKey: string) => this.translocoService.translate('errors.default', {VALUE: errorKey})
  };

  constructor(
    private translocoService: TranslocoService
  ) { }

  shouldShowErrors(): boolean | null {
    return this.ctrl && this.ctrl.errors && this.ctrl.touched;
  }

  translateError(errorKey: string, value?: string): string {
    console.log(errorKey);
    const params = {
      VALUE: value
    }
    return this.translocoService.translate(`errors.${errorKey}`, params);
  }

  listOfErrors(): string[] {
    const errors: any = this.ctrl.errors;
    const errorsKeys = Object.keys(errors);
    return errorsKeys.map(errorKey =>
      this.ERROR_MESSAGE[errorKey] ?
        this.ERROR_MESSAGE[errorKey](errorKey, this.ctrl.getError(errorKey)) : this.ERROR_MESSAGE.default(errorKey));
  }

}
