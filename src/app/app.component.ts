import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from './core/services/translation.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private readonly _translationService: TranslationService) {}
}
