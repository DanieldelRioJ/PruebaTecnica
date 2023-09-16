import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  readonly LANG_KEY = 'LANG';
  storage = localStorage;
  constructor(private readonly _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe(({ lang }) =>
      this.storage.setItem(this.LANG_KEY, lang)
    );
    this._setDefaultLang();
  }

  private _setDefaultLang() {
    const defaultLang =
      this.storage.getItem(this.LANG_KEY) ??
      this._translateService.getBrowserLang() ??
      'en';
    this._translateService.use(defaultLang);
  }
}
