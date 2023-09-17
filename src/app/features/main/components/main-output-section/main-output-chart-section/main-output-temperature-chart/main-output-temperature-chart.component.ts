import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartModule } from 'angular-highcharts';
import { MainModelService } from '../../../../services/main-model.service';
import { UnsubscribeDirective } from '../../../../../../shared/directives/unsubscribe.directive';
import { checkIndividualModelType } from '../../../../../../shared/types/individual-model.type';
import { filter, map, Observable } from 'rxjs';
import { MainOutputTemperatureChartService } from './main-output-temperature-chart.service';

@Component({
  selector: 'app-main-output-temperature-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './main-output-temperature-chart.component.html',
  styleUrls: ['./main-output-temperature-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputTemperatureChartComponent extends UnsubscribeDirective {
  chart$!: Observable<Chart>;

  constructor(
    private readonly _mainModelService: MainModelService,
    private readonly _mainOutputTemperatureChartService: MainOutputTemperatureChartService
  ) {
    super();
    this._getData();
  }

  private _getData() {
    this.chart$ = this._mainModelService.data$.pipe(
      filter(checkIndividualModelType),
      map((data) => {
        const days = data.days;
        return this._mainOutputTemperatureChartService.createChart(days);
      })
    );
  }
}
