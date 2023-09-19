import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutButtonComponent } from '../../logout-button/logout-button.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { TranslationDropdownComponent } from '../translation-dropdown/translation-dropdown.component';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    CommonModule,
    LogoutButtonComponent,
    MatToolbarModule,
    ThemeSelectorComponent,
    TranslationDropdownComponent
  ],
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenubarComponent {}
