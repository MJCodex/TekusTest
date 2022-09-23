import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { patterns } from '../utilities/constants';

@Component({
  selector: 'app-errors-handler',
  templateUrl: './errors-handler.component.html',
  styleUrls: ['./errors-handler.component.sass']
})
export class ErrorsHandlerComponent {
  defaultMaxErrors = 2;
  @Input() control!: UntypedFormControl;
  @Input() skipErrors: string[] = [];
  @Input() maxErrors = this.defaultMaxErrors;
  @Input() showAllErrors!: boolean;
  ERROR_MESSAGE: Record<string, Function> = {
    required: (errorKey: string) => this.translateError(errorKey),
    minlength: (errorKey: string, params: any) => this.translateError(errorKey, params.requiredLength),
    maxlength: (errorKey: string, params: any) => this.translateError(errorKey, params.requiredLength),
    pattern: (errorKey: string, params: any) => this.translateError(errorKey, params),
    default: (errorKey: string) => this.translocoService.translate('errors.default', {VALUE: errorKey})
  };

  constructor(
    private translocoService: TranslocoService
  ) { }

  shouldShowErrors(): boolean | null {
    return this.control && this.control.errors && this.control.touched;
  }

  translateError(errorKey: string, value?: string | any): string {
    const params = {
      VALUE: value
    }
    if (errorKey === 'pattern') {
      const currentPattern = Object.values(patterns).find((pattern) => pattern.pattern === value.requiredPattern);
      return this.translocoService.translate(currentPattern ? currentPattern.key : 'errors.default', {VALUE: errorKey});
    }
    return this.translocoService.translate(`errors.${errorKey}`, params);
  }

  listOfErrors(): string[] {
    const errors: any = this.control.errors;
    const errorsKeys = Object.keys(errors);
    return errorsKeys
      .filter(errorKey => !this.skipErrors.includes(errorKey))
      .map(errorKey =>
      this.ERROR_MESSAGE[errorKey] ?
        this.ERROR_MESSAGE[errorKey](errorKey, this.control.getError(errorKey)) : this.ERROR_MESSAGE.default(errorKey));
  }

}
