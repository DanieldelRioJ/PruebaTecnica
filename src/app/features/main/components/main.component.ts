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
import { UnsubscribeDirective } from '../../../core/directives/unsubscribe.directive';
import { combineLatest, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { MainModelService } from '../services/main-model.service';
import { ToastrService } from 'ngx-toastr';
import {
  fromFormToModel,
  fromModelToForm
} from '../../../core/utils/api-parser';
import { LocationService } from '../../../core/services/location.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    LogoutButtonComponent,
    MainInputSectionComponent
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
    private readonly _weatherApiService: WeatherApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this._listenToQueryParams();
  }

  private _listenToQueryParams() {
    combineLatest([
      this._activatedRoute.queryParams,
      this._locationService.location$.pipe(
        map((location) =>
          location ? `${location.latitude}, ${location.longitude}` : null
        )
      )
    ])
      .pipe(
        tap(([_, location]) => {
          if (location != null) {
            this._mainFormService.mainInputForm.patchValue(
              fromModelToForm({ location })
            );
          }
        }),
        map(([queryParams, location]) => {
          return { ...queryParams, location };
        }),
        filter((queryParams) => Object.values(queryParams).length !== 0),
        tap((queryParams) => {
          this._mainFormService.mainInputForm.patchValue(
            fromModelToForm(queryParams)
          );
          if (!this._mainFormService.mainInputForm.valid) {
            this._toastrService.error('La query introducida no es correcta');
          }
        }),
        filter(() => this._mainFormService.mainInputForm.valid),
        switchMap((queryParams) =>
          this._weatherApiService.getData(fromFormToModel(queryParams))
        ),
        takeUntil(this._unsubscribe$)
      )
      .subscribe({
        next: (weatherResponse) => {
          this._mainModelService.data = weatherResponse;
        },
        error: (error) => {
          this._toastrService.error(error.error);
        }
      });
  }
}
