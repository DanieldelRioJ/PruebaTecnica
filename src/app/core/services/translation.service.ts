import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGS } from '../../../config/lang.values';
import { map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  readonly DEFAULT_LANG = 'en';
  readonly LANGS = ['en', 'es'];
  readonly LANG_KEY = 'LANG';
  storage = localStorage;

  get lang$() {
    return this._translateService.onLangChange.pipe(
      map(({ lang }) => lang),
      startWith(this._translateService.currentLang)
    );
  }
  constructor(private readonly _translateService: TranslateService) {
    this._translateService.onLangChange.subscribe(({ lang }) =>
      this.storage.setItem(this.LANG_KEY, lang)
    );
    this._setDefaultLang();
  }

  changeLang(lang: string) {
    if (!LANGS.map((lang) => lang.id).includes(this.DEFAULT_LANG)) {
      lang = this.DEFAULT_LANG;
    }
    this._translateService.use(lang);
  }

  private _setDefaultLang() {
    let lang =
      this.storage.getItem(this.LANG_KEY) ??
      this._translateService.getBrowserLang() ??
      this.DEFAULT_LANG;
    if (!LANGS.map((lang) => lang.id).includes(this.DEFAULT_LANG)) {
      lang = this.DEFAULT_LANG;
    }
    this._translateService.use(lang);
  }
}
