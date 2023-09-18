import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { Chart, ChartModule } from 'angular-highcharts';
import { MainModelService } from '../../../../services/main-model.service';
import { checkIndividualModelType } from '../../../../../../shared/types/individual-model.type';
import { IWeatherDay } from '../../../../models/weather-response.model';
import { ThemeService } from '../../../../../../core/services/theme.service';
import { TranslationService } from '../../../../../../core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-output-windspeed-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './main-output-windspeed-chart.component.html',
  styleUrls: ['./main-output-windspeed-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputWindspeedChartComponent implements OnInit {
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
        type: 'line'
      },
      title: {
        text: this._translateService.instant('MAIN.CHARTS.WINDSPEED.WINDSPEED')
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
            format: '{value}km/h'
          }
        }
      ],
      tooltip: {
        shared: true,
        valueSuffix: ' km/h'
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
          color: 'grey',
          type: 'column',
          name: this._translateService.instant(
            'MAIN.CHARTS.WINDSPEED.WINDSPEED'
          ),
          data: days.map((day) => day.windspeed)
        }
      ]
    });
  }
}
