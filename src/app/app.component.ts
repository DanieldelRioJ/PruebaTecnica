import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { TranslationService } from './core/services/translation.service';
import { ThemeService } from './core/services/theme.service';
import { DOCUMENT } from '@angular/common';
import { UnsubscribeDirective } from './shared/directives/unsubscribe.directive';
import { takeUntil } from 'rxjs';
import { slideInAnimation } from './animation';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
  animations: [slideInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends UnsubscribeDirective implements OnInit {
  constructor(
    private readonly contexts: ChildrenOutletContexts,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly _translationService: TranslationService,
    private readonly _themeService: ThemeService
  ) {
    super();
  }

  ngOnInit(): void {
    this._addClassOnThemeChange();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  private _addClassOnThemeChange() {
    this._themeService.theme$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((mode) => {
        if (mode === 'LIGHT') {
          this.document.body.classList.remove('dark-theme');
          this.document.body.classList.add('light-theme');
        } else {
          this.document.body.classList.remove('light-theme');
          this.document.body.classList.add('dark-theme');
        }
      });
  }
}
