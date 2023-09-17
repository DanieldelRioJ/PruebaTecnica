import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherApiService } from '../services/weather-api.service';
import { LogoutButtonComponent } from '../../../shared/logout-button/logout-button.component';
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
} from '../../../core/utils/api-parser';
import { LocationService } from '../../../core/services/location.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MainOutputSectionComponent } from './main-output-section/main-output-section.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    LogoutButtonComponent,
    MainInputSectionComponent,
    MainOutputSectionComponent
  ],
  providers: [MainFormService, MainModelService],
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
    private readonly _weatherApiService: WeatherApiService,
    private readonly _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
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
}
