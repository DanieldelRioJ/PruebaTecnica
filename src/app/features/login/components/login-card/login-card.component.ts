import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { LoginCardFormService } from '../../services/login-card-form.service';
import { LoginCardFormComponent } from './login-card-form/login-card-form.component';
import { map } from 'rxjs';
import { LoginCardFormControls } from './login-card-form/login-card-form.config';
import { AuthService } from '../../../../core/store/auth.service';
import { Router } from '@angular/router';
import { MainRoutes } from '../../../../routes';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    MatButtonModule,
    LoginCardFormComponent
  ],
  providers: [LoginCardFormService],
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCardComponent {
  formValid$ = this._loginCardFormService.loginForm.statusChanges.pipe(
    map((status) => status === 'VALID')
  );
  constructor(
    private readonly _loginCardFormService: LoginCardFormService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  login() {
    this._authService.key =
      this._loginCardFormService.loginForm.value[
        LoginCardFormControls.API_KEY
      ]!;
    this._router.navigate([MainRoutes.MAIN]);
  }
}
