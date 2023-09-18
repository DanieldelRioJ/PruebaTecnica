import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MainInputSectionFormControls } from '../components/main-input-section/main-input-section-form/main-input-section-form.config';
import { isDate } from '../../../shared/utils/date-validator';

@Injectable()
export class MainFormService {
  mainInputForm = this._fb.group({
    [MainInputSectionFormControls.FROM]: ['', [Validators.required, isDate()]],
    [MainInputSectionFormControls.TO]: ['', [Validators.required, isDate()]],
    [MainInputSectionFormControls.LOCATION]: ['', [Validators.required]]
  });
  constructor(private readonly _fb: FormBuilder) {}
}
