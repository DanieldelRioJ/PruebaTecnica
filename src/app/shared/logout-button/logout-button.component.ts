import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/store/auth.service';
import { Router } from '@angular/router';
import { MainRoutes } from '../../routes';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutButtonComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _translateService: TranslateService
  ) {}

  logout() {
    this._authService.deleteKey();
    this._toastrService.info(
      this._translateService.instant('LOGIN.SESSION_CLOSED')
    );
    this._router.navigate([MainRoutes.LOGIN]);
  }
}
