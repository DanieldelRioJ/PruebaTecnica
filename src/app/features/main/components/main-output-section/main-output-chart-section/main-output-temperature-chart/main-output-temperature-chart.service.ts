import { Injectable } from '@angular/core';
import { IWeatherDay } from '../../../../models/weather-response.model';
import { Chart } from 'angular-highcharts';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MainOutputTemperatureChartService {
  constructor(
    private readonly _datePipe: DatePipe,
    private readonly _translateService: TranslateService
  ) {}

  createChart(days: IWeatherDay[]): Chart {
    return new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: this._translateService.instant(
          'MAIN.CHARTS.TEMPERATURE.TEMPERATURE'
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
      yAxis: {
        labels: {
          format: '{value}ºC'
        },
        title: {
          text: `${this._translateService.instant(
            'MAIN.CHARTS.TEMPERATURE.TEMPERATURE'
          )} (°C)`
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' ºC'
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
          type: 'line',
          name: this._translateService.instant(
            'MAIN.CHARTS.TEMPERATURE.TEMPERATURE'
          ),
          data: days.map((day) => day.temp)
        },
        {
          type: 'line',
          name: this._translateService.instant(
            'MAIN.CHARTS.TEMPERATURE.FEELSLIKE'
          ),
          data: days.map((day) => day.feelslike)
        }
      ]
    });
  }
}
