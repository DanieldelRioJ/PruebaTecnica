import { Injectable } from '@angular/core';
import { IWeatherDay } from '../../../../models/weather-response.model';
import { Chart } from 'angular-highcharts';

@Injectable({
  providedIn: 'root'
})
export class MainOutputTemperatureChartService {
  constructor() {}

  createChart(days: IWeatherDay[]): Chart {
    return new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Temperature'
      },
      subtitle: {
        text:
          'Source: ' +
          '<a href="https://www.visualcrossing.com/" ' +
          'target="_blank">VisualCrossing</a>'
      },
      xAxis: {
        categories: days.map((days) => days.datetime)
      },
      yAxis: {
        labels: {
          format: '{value}ºC'
        },
        title: {
          text: 'Temperature (°C)'
        }
      },
      tooltip: {
        shared: true
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
          name: 'Reggane',
          data: days.map((day) => day.temp)
        },
        {
          type: 'line',
          name: 'Tallinn',
          data: days.map((day) => day.feelslike)
        }
      ]
    });
  }
}
