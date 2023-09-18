import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from './login-card/login-card.component';
import { TranslationDropdownComponent } from '../../../shared/components/translation-dropdown/translation-dropdown.component';
import { MatCardModule } from '@angular/material/card';
import { ThemeSelectorComponent } from '../../../shared/components/theme-selector/theme-selector.component';
import { ThemeService } from '../../../core/services/theme.service';
import { loginAnimation } from './login.animation';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LoginCardComponent,
    TranslationDropdownComponent,
    MatCardModule,
    ThemeSelectorComponent
  ],
  animations: [loginAnimation],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  darkModeBackground$ = this._themeService.theme$.pipe(
    map((mode) => (mode === 'DARK' ? 'visible' : 'hidden'))
  );
  lightModeBackground$ = this._themeService.theme$.pipe(
    map((mode) => (mode === 'LIGHT' ? 'visible' : 'hidden'))
  );
  constructor(private readonly _themeService: ThemeService) {}
}
