import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainOutputTemperatureChartComponent } from './main-output-temperature-chart/main-output-temperature-chart.component';
import { MainOutputHumidityPreciprobChartComponent } from './main-output-humidity-preciprob-chart/main-output-humidity-preciprob-chart.component';
import { MainOutputWindspeedChartComponent } from './main-output-windspeed-chart/main-output-windspeed-chart.component';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-main-output-chart-section',
  standalone: true,
  imports: [
    CommonModule,
    MainOutputTemperatureChartComponent,
    MainOutputHumidityPreciprobChartComponent,
    MainOutputWindspeedChartComponent
  ],
  templateUrl: './main-output-chart-section.component.html',
  styleUrls: ['./main-output-chart-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputChartSectionComponent {
  constructor() {
    Highcharts.setOptions({
      colors: [
        '#058DC7',
        '#50B432',
        '#ED561B',
        '#DDDF00',
        '#24CBE5',
        '#64E572',
        '#FF9655',
        '#FFF263',
        '#6AF9C4'
      ],
      chart: {
        backgroundColor: '#555'
      },
      title: {
        style: {
          color: 'white',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      subtitle: {
        style: {
          color: '#b9b9b9',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      yAxis: {
        labels: {
          style: {
            color: 'white'
          }
        }
      },
      xAxis: {
        labels: {
          style: {
            color: 'white'
          }
        },
        gridLineColor: 'white',
        minorGridLineColor: '#424242',
        tickColor: '#424242',
        minorTickColor: '#424242',
        lineColor: '#424242'
      },
      legend: {
        itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: 'white'
        },
        itemHoverStyle: {
          color: 'white'
        }
      }
    } as any);
  }
}
