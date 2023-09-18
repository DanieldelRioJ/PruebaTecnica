import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map, Observable } from 'rxjs';
import { Chart, ChartModule } from 'angular-highcharts';
import { MainModelService } from '../../../../services/main-model.service';
import { checkIndividualModelType } from '../../../../../../shared/types/individual-model.type';
import { IWeatherDay } from '../../../../models/weather-response.model';

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
  constructor(private _mainModelService: MainModelService) {}

  ngOnInit(): void {
    this._getData();
  }

  private _getData() {
    this.chart$ = this._mainModelService.data$.pipe(
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
        text: 'Humidity & Precipprob'
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
      yAxis: [
        {
          labels: {
            format: '{value}km/h'
          }
        }
      ],
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
          color: 'grey',
          type: 'column',
          name: 'Windspeed',
          data: days.map((day) => day.windspeed)
        }
      ]
    });
  }
}
