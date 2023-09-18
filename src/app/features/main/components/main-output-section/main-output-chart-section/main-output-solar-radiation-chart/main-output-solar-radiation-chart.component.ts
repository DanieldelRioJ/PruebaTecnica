import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { Chart, ChartModule } from 'angular-highcharts';
import { MainModelService } from '../../../../services/main-model.service';
import { ThemeService } from '../../../../../../core/services/theme.service';
import { TranslationService } from '../../../../../../core/services/translation.service';
import { checkIndividualModelType } from '../../../../../../shared/types/individual-model.type';
import { IWeatherDay } from '../../../../models/weather-response.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-output-solar-radiation-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './main-output-solar-radiation-chart.component.html',
  styleUrls: ['./main-output-solar-radiation-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputSolarRadiationChartComponent implements OnInit {
  chart$?: Observable<Chart>;

  constructor(
    private _mainModelService: MainModelService,
    private _themeService: ThemeService,
    private _translationService: TranslationService,
    private readonly _translateService: TranslateService,
    private readonly _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this._getData();
  }

  private _getData() {
    this.chart$ = combineLatest([
      this._mainModelService.data$,
      this._themeService.theme$,
      this._translationService.lang$
    ]).pipe(
      map(([data]) => data),
      filter(checkIndividualModelType),
      map((data) => {
        const days = data.days;
        return this._chartBuilder(days);
      })
    );
  }

  private _chartBuilder(days: IWeatherDay[]) {
    return new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: this._translateService.instant(
          'MAIN.CHARTS.SOLAR_RADIATION.SOLAR_RADIATION'
        )
      },
      subtitle: {
        text:
          `${this._translateService.instant('SHARED.SOURCE')}: ` +
          '<a href="https://www.visualcrossing.com/" ' +
          'target="_blank">VisualCrossing</a>'
      },
      xAxis: {
        categories: days.map(
          (days) =>
            this._datePipe.transform(
              days.datetime,
              'shortDate',
              undefined,
              this._translateService.currentLang
            ) as string
        )
      },
      yAxis: [
        {
          labels: {
            format: '{value}W/m2'
          }
        }
      ],
      tooltip: {
        shared: true,
        valueSuffix: ' W/m2'
      },

      plotOptions: {
        series: {
          cursor: 'pointer',
          className: 'popup-on-click',
          marker: {
            lineWidth: 1
          }
        }
      },
      series: [
        {
          color: 'purple',
          type: 'column',
          name: this._translateService.instant(
            'MAIN.CHARTS.SOLAR_RADIATION.SOLAR_RADIATION'
          ),
          data: days.map((day) => day.solarradiation)
        }
      ]
    });
  }
}
