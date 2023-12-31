import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Provider
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherApiService } from '../services/weather-api.service';
import { MainInputSectionComponent } from './main-input-section/main-input-section.component';
import { MainFormService } from '../services/main-form.service';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeDirective } from '../../../shared/directives/unsubscribe.directive';
import { catchError, filter, of, switchMap, takeUntil, tap } from 'rxjs';
import { MainModelService } from '../services/main-model.service';
import { ToastrService } from 'ngx-toastr';
import {
  fromFormToModel,
  fromModelToForm
} from '../../../shared/utils/api-parser';
import { LocationService } from '../../../core/services/location.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MainOutputSectionComponent } from './main-output-section/main-output-section.component';
import { MainInputSectionFormControls } from './main-input-section/main-input-section-form/main-input-section-form.config';
import { WeatherApiInterfaceService } from '../services/weather-api-interface.service';
import { environment } from '../../../../environments/environment';
import { WeatherApiMockedService } from '../services/weather-api-mocked.service';
import { MatDividerModule } from '@angular/material/divider';
import { MenubarComponent } from '../../../shared/components/menubar/menubar.component';

const apiWeatherProvider: Provider = {
  provide: WeatherApiInterfaceService,
  useClass: environment.USE_MOCK_DATA
    ? WeatherApiMockedService
    : WeatherApiService
};
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MainInputSectionComponent,
    MainOutputSectionComponent,
    MatDividerModule,
    MenubarComponent
  ],
  providers: [apiWeatherProvider, MainFormService, MainModelService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent extends UnsubscribeDirective implements OnInit {
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _locationService: LocationService,
    private readonly _toastrService: ToastrService,
    private readonly _mainFormService: MainFormService,
    private readonly _mainModelService: MainModelService,
    private readonly _weatherApiService: WeatherApiInterfaceService,
    private readonly _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this._listenToUserLocation();
    this._listenToQueryParams();
  }

  private _listenToQueryParams() {
    this._activatedRoute.queryParams
      .pipe(
        tap((queryParams) => {
          this._mainFormService.mainInputForm.patchValue(
            fromModelToForm(queryParams)
          );
          this._translateService.instant('MAIN.FORM.NOT_VALID');
        }),
        filter(
          (queryParams) =>
            Object.values(queryParams).length ==
            Object.values(this._mainFormService.mainInputForm.controls).length
        ),
        tap(() => {
          if (!this._mainFormService.mainInputForm.valid) {
            this._translateService.instant('MAIN.FORM.NOT_VALID');
          }
        }),
        filter(() => this._mainFormService.mainInputForm.valid),
        tap(() => (this._mainModelService.data = 'loading')),
        switchMap((queryParams) =>
          this._weatherApiService.getData(fromFormToModel(queryParams)).pipe(
            catchError((e: HttpErrorResponse) => {
              this._toastrService.error(e.error);
              return of(null);
            })
          )
        ),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((weatherResponse) => {
        this._mainModelService.data = weatherResponse;
      });
  }

  private _listenToUserLocation() {
    this._locationService.location$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((location) => {
        const formControl = this._mainFormService.mainInputForm.get(
          MainInputSectionFormControls.LOCATION
        );
        if (location != null && !formControl?.valid) {
          this._mainFormService.mainInputForm.patchValue({
            location: `${location.latitude}, ${location.longitude}`
          });
        } else if (location == null && !formControl?.valid) {
          this._mainFormService.mainInputForm.patchValue({
            location: 'A Coruña'
          });
        }
      });
  }
}
