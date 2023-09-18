import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from './login-card/login-card.component';
import { TranslationDropdownComponent } from '../../../shared/components/translation-dropdown/translation-dropdown.component';
import { MatCardModule } from '@angular/material/card';
import { ThemeSelectorComponent } from '../../../shared/components/theme-selector/theme-selector.component';

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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {}
