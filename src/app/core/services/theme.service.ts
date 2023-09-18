import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type THEME_MODES = 'LIGHT' | 'DARK';
@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  readonly THEME_KEY = 'THEME';
  readonly storage = localStorage;
  private _modeSubject = new BehaviorSubject<THEME_MODES>('LIGHT');
  mode$ = this._modeSubject.asObservable();

  constructor() {
    this._setUserPreference();
  }

  private _setUserPreference() {
    if (this.storage.getItem(this.THEME_KEY) === 'DARK') {
      this._modeSubject.next('DARK');
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this._modeSubject.next('DARK');
    }
  }

  setMode(mode: THEME_MODES) {
    this.storage.setItem(this.THEME_KEY, mode);
    this._modeSubject.next(mode);
  }

  ngOnDestroy(): void {
    this._modeSubject.complete();
  }
}
