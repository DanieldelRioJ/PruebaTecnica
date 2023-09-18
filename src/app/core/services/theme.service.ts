import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type THEME_MODES = 'LIGHT' | 'DARK';
@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  readonly THEME_KEY = 'THEME';
  readonly storage = localStorage;
  private _themeSubject = new BehaviorSubject<THEME_MODES>('LIGHT');
  theme$ = this._themeSubject.asObservable();

  constructor() {
    this._setUserPreference();
  }

  private _setUserPreference() {
    const savedValue = this.storage.getItem(this.THEME_KEY);
    if (savedValue != null) {
      this._themeSubject.next(savedValue === 'LIGHT' ? 'LIGHT' : 'DARK');
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this._themeSubject.next('DARK');
    }
  }

  setTheme(mode: THEME_MODES) {
    this.storage.setItem(this.THEME_KEY, mode);
    this._themeSubject.next(mode);
  }

  ngOnDestroy(): void {
    this._themeSubject.complete();
  }
}
