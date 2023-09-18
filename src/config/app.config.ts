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
import { routes } from '../app/routes';
import { ApplicationConfig } from '@angular/platform-browser';
import { keyInterceptor } from '../app/core/interceptors/key.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLangLocales } from './lang.config';

registerLangLocales();
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
        }
      })
    ),
    importProvidersFrom(ToastrModule.forRoot())
  ]
};
