import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainOutputTemperatureChartComponent } from './main-output-temperature-chart/main-output-temperature-chart.component';
import { MainOutputHumidityPreciprobChartComponent } from './main-output-humidity-preciprob-chart/main-output-humidity-preciprob-chart.component';
import { MainOutputWindspeedChartComponent } from './main-output-windspeed-chart/main-output-windspeed-chart.component';
import * as Highcharts from 'highcharts';
import { ThemeService } from '../../../../../core/services/theme.service';
import { UnsubscribeDirective } from '../../../../../shared/directives/unsubscribe.directive';
import { takeUntil } from 'rxjs';
import {
  HIGHCHARTS_DARK_THEME,
  HIGHCHARTS_LIGHT_THEME
} from '../../../../../../config/highcharts.config';
import { MainOutputSolarRadiationChartComponent } from './main-output-solar-radiation-chart/main-output-solar-radiation-chart.component';

@Component({
  selector: 'app-main-output-chart-section',
  standalone: true,
  imports: [
    CommonModule,
    MainOutputTemperatureChartComponent,
    MainOutputHumidityPreciprobChartComponent,
    MainOutputWindspeedChartComponent,
    MainOutputSolarRadiationChartComponent
  ],
  templateUrl: './main-output-chart-section.component.html',
  styleUrls: ['./main-output-chart-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputChartSectionComponent
  extends UnsubscribeDirective
  implements OnInit
{
  constructor(private readonly _themeService: ThemeService) {
    super();
  }

  ngOnInit(): void {
    this._changeChartThemeWhenMainThemeChanges();
  }

  private _changeChartThemeWhenMainThemeChanges() {
    this._themeService.theme$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((themeMode) => {
        if (themeMode === 'LIGHT') {
          Highcharts.setOptions(HIGHCHARTS_LIGHT_THEME);
        } else {
          Highcharts.setOptions(HIGHCHARTS_DARK_THEME);
        }
      });
  }
}
