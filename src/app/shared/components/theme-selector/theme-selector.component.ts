import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import {
  THEME_MODES,
  ThemeService
} from '../../../core/services/theme.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule
  ],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorComponent {
  @Input() color: 'primary' | 'accent' = 'primary';
  isDarkMode$ = this._themeService.mode$.pipe(map((mode) => mode === 'DARK'));
  constructor(private readonly _themeService: ThemeService) {}

  changeMode(mode: THEME_MODES) {
    this._themeService.setMode(mode);
  }
}
