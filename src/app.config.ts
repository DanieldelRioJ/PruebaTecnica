import { provideRouter } from '@angular/router';

import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { routes } from './app/routes';
import { ApplicationConfig } from '@angular/platform-browser';
import { keyInterceptor } from './app/core/interceptors/key.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import localeGl from '@angular/common/locales/gl';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs);
registerLocaleData(localePt);
registerLocaleData(localeGl);
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'en-US' },
    provideRouter(routes),
    provideHttpClient(withInterceptors([keyInterceptor])),
    provideAnimations(),
    MatSnackBar,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        },
        defaultLanguage: 'en'
      })
    ),
    importProvidersFrom(ToastrModule.forRoot())
  ]
};
