import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartModule } from 'angular-highcharts';
import { MainModelService } from '../../../../services/main-model.service';
import { UnsubscribeDirective } from '../../../../../../shared/directives/unsubscribe.directive';
import { checkIndividualModelType } from '../../../../../../shared/types/individual-model.type';
import { combineLatest, filter, map, Observable, startWith } from 'rxjs';
import { MainOutputTemperatureChartService } from './main-output-temperature-chart.service';
import { ThemeService } from '../../../../../../core/services/theme.service';
import { TranslationService } from '../../../../../../core/services/translation.service';
import { LoadingComponent } from '../../../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-main-output-temperature-chart',
  standalone: true,
  imports: [CommonModule, ChartModule, LoadingComponent],
  templateUrl: './main-output-temperature-chart.component.html',
  styleUrls: ['./main-output-temperature-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputTemperatureChartComponent extends UnsubscribeDirective {
  chart$!: Observable<Chart>;
  loading$ = this._mainModelService.data$.pipe(
    map((data) => data === 'loading')
  );

  constructor(
    private readonly _mainModelService: MainModelService,
    private readonly _mainOutputTemperatureChartService: MainOutputTemperatureChartService,
    private _themeService: ThemeService,
    private _translationService: TranslationService
  ) {
    super();
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
        return this._mainOutputTemperatureChartService.createChart(days);
      }),
      startWith(new Chart())
    );
  }
}
