import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { LoginCardFormService } from '../../../services/login-card-form.service';
import {
  LoginCardFormControls,
  LoginCardFormLabels
} from './login-card-form.config';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-card-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login-card-form.component.html',
  styleUrls: ['./login-card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCardFormComponent {
  form = this._loginCardFormService.loginForm;
  controls = LoginCardFormControls;
  labels = LoginCardFormLabels;
  constructor(private readonly _loginCardFormService: LoginCardFormService) {}
}
