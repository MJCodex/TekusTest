import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { patterns } from '../../utilities/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-errors-handler',
  templateUrl: './errors-handler.component.html',
  styleUrls: ['./errors-handler.component.sass']
})
export class ErrorsHandlerComponent {
  defaultMaxErrors = 2;
  @Input() inputFormControl!: FormControl;
  @Input() skipErrors: string[] = [];
  @Input() maxErrors = this.defaultMaxErrors;
  @Input() showAllErrors!: boolean;
  ERROR_MESSAGE: Record<string, Function> = {
    required: (errorKey: string) => this.translateError(errorKey),
    minlength: (errorKey: string, params: any) => this.translateError(errorKey, params.requiredLength),
    maxlength: (errorKey: string, params: any) => this.translateError(errorKey, params.requiredLength),
    pattern: (errorKey: string, params: any) => this.translateError(errorKey, params),
    default: (errorKey: string) => this._translateService.instant('errors.default', {VALUE: errorKey})
  };

  constructor(
    private _translateService: TranslateService
  ) { }

  shouldShowErrors(): boolean | null {
    return this.inputFormControl && this.inputFormControl.errors && this.inputFormControl.touched;
  }

  translateError(errorKey: string, value?: string | any): string {
    const params = {
      VALUE: value
    }
    if (errorKey === 'pattern') {
      const currentPattern = Object.values(patterns).find((pattern) => pattern.pattern === value.requiredPattern);
      return this._translateService.instant(currentPattern ? currentPattern.key : 'errors.default', {VALUE: errorKey});
    }
    return this._translateService.instant(`errors.${errorKey}`, params);
  }

  listOfErrors(): string[] {
    const errors: any = this.inputFormControl.errors;
    const errorsKeys = Object.keys(errors);
    return errorsKeys
      .filter(errorKey => !this.skipErrors.includes(errorKey))
      .map(errorKey =>
      this.ERROR_MESSAGE[errorKey] ?
        this.ERROR_MESSAGE[errorKey](errorKey, this.inputFormControl.getError(errorKey)) : this.ERROR_MESSAGE.default(errorKey));
  }

}
