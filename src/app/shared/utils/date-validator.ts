import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidDate } from 'rxjs/internal/util/isDate';

export function isDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return !isValidDate(value) ? { validDate: true } : null;
  };
}
