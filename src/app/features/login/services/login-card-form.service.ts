import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginCardFormControls } from '../components/login-card/login-card-form/login-card-form.config';

@Injectable()
export class LoginCardFormService {
  loginForm = this._fb.group({
    [LoginCardFormControls.API_KEY]: [
      null,
      [Validators.required, Validators.minLength(1)]
    ]
  });

  constructor(private _fb: FormBuilder) {}
}
