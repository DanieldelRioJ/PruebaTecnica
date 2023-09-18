import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../../core/services/translation.service';
import { UnsubscribeDirective } from '../../directives/unsubscribe.directive';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { LANGS } from '../../../../config/lang.values';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-translation-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSelectModule
  ],
  templateUrl: './translation-dropdown.component.html',
  styleUrls: ['./translation-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationDropdownComponent extends UnsubscribeDirective {
  langFormControl: FormControl = new FormControl<string | null>(null, {
    validators: [Validators.required]
  });
  langs = LANGS;

  constructor(private readonly _translationService: TranslationService) {
    super();
    this._onControlChanges();
    this._setData();
  }

  private _setData() {
    this._translationService.lang$
      .pipe(distinctUntilChanged(), takeUntil(this._unsubscribe$))
      .subscribe((lang) => this.langFormControl.setValue(lang));
  }

  private _onControlChanges() {
    this.langFormControl.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((lang) => {
        this._translationService.changeLang(lang);
      });
  }

  compareFunction(o1: string, o2: string) {
    return o1 == o2;
  }
}
