import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'formControl'
})
export class FormControlPipe implements PipeTransform {

  /**
   * Transforma un AbstractControl en un FormControl
   * @param {AbstractControl} value
   * @returns {FormControl<typeof value['value']>}
   */
  transform(value: AbstractControl): FormControl<typeof value['value']> {
    return value as FormControl<typeof value['value']>;
  }
}
