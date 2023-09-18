import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainModelService } from '../../../../services/main-model.service';
import { combineLatest, filter, map, Observable, startWith } from 'rxjs';
import { checkIndividualModelType } from '../../../../../../shared/types/individual-model.type';
import { Chart, ChartModule } from 'angular-highcharts';
import { IWeatherDay } from '../../../../models/weather-response.model';
import { ThemeService } from '../../../../../../core/services/theme.service';
import { TranslationService } from '../../../../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-main-output-humidity-preciprob-chart',
  standalone: true,
  imports: [CommonModule, ChartModule, LoadingComponent],
  templateUrl: './main-output-humidity-preciprob-chart.component.html',
  styleUrls: ['./main-output-humidity-preciprob-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputHumidityPreciprobChartComponent implements OnInit {
  chart$?: Observable<Chart>;
  loading$ = this._mainModelService.data$.pipe(
    map((data) => data === 'loading')
  );
  constructor(
    private readonly _mainModelService: MainModelService,
    private readonly _themeService: ThemeService,
    private readonly _translationService: TranslationService,
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
      }),
      startWith(new Chart())
    );
  }

  private _chartBuilder(days: IWeatherDay[]) {
    return new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: this._translateService.instant(
          'MAIN.CHARTS.HUMIDITY.HUMIDITY_PRECIP_PROB'
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
            format: '{value}%'
          }
        }
      ],
      tooltip: {
        shared: true,
        valueSuffix: ' %'
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
          type: 'column',
          name: this._translateService.instant(
            'MAIN.CHARTS.HUMIDITY.PRECIP_PROB'
          ),
          data: days.map((day) => day.precipprob)
        },
        {
          type: 'line',
          name: this._translateService.instant('MAIN.CHARTS.HUMIDITY.HUMIDITY'),
          data: days.map((day) => day.humidity)
        }
      ]
    });
  }
}
