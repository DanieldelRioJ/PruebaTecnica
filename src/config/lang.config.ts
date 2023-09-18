import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import localeGl from '@angular/common/locales/gl';
import localeCa from '@angular/common/locales/ca';
import localeEu from '@angular/common/locales/eu';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

export function registerLangLocales() {
  registerLocaleData(localeEs);
  registerLocaleData(localePt);
  registerLocaleData(localeGl);
  registerLocaleData(localeCa);
  registerLocaleData(localeEu);
  registerLocaleData(localeEn);
  registerLocaleData(localeFr);
}
