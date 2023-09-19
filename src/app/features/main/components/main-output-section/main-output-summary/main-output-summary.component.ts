import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UnsubscribeDirective } from '../../../../../shared/directives/unsubscribe.directive';
import { MainModelService } from '../../../services/main-model.service';
import { checkIndividualModelType } from '../../../../../shared/types/individual-model.type';
import { combineLatest, filter, map } from 'rxjs';
import { IWeatherResponse } from '../../../models/weather-response.model';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../../../core/services/translation.service';

@Component({
  selector: 'app-main-output-summary',
  standalone: true,
  imports: [CommonModule, LoadingComponent, TranslateModule],
  templateUrl: './main-output-summary.component.html',
  styleUrls: ['./main-output-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainOutputSummaryComponent extends UnsubscribeDirective {
  data$ = combineLatest([
    this._mainModelService.data$.pipe(filter(checkIndividualModelType)),
    this._translationService.lang$
  ]).pipe(map(([data, lang]) => this._getSummarizeData(data, lang)));
  isLoading$ = this._mainModelService.data$.pipe(
    map((data) => data === 'loading')
  );
  constructor(
    private readonly _mainModelService: MainModelService,
    private readonly _translationService: TranslationService,
    private readonly _datePipe: DatePipe
  ) {
    super();
  }

  private _getSummarizeData(weather: IWeatherResponse, lang: string) {
    const hottestDay = weather.days.reduce((maxTempDay, r) =>
      maxTempDay.temp > r.temp ? maxTempDay : r
    );
    const coldestDay = weather.days.reduce((minTempDay, r) =>
      minTempDay.temp < r.temp ? minTempDay : r
    );
    const rainiestDay = weather.days.reduce((rainiestDay, r) =>
      rainiestDay.precipprob > r.precipprob ? rainiestDay : r
    );
    const wettestDay = weather.days.reduce((wettestDay, r) =>
      wettestDay.temp < r.temp ? wettestDay : r
    );
    return {
      hottestDay: {
        date: this._convertDate(hottestDay.datetime, lang),
        value: hottestDay.temp
      },
      coldestDay: {
        date: this._convertDate(coldestDay.datetime, lang),
        value: coldestDay.temp
      },
      rainiestDay: {
        date: this._convertDate(rainiestDay.datetime, lang),
        value: rainiestDay.precipprob
      },
      wettestDay: {
        date: this._convertDate(wettestDay.datetime, lang),
        value: wettestDay.humidity
      }
    };
  }

  private _convertDate(date: string, lang: string) {
    return this._datePipe.transform(date, 'fullDate', undefined, lang);
  }
}
