import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWeatherResponse } from '../models/weather-response.model';
import { IndividualModelType } from '../../../core/types/individual-model.type';

@Injectable()
export class MainModelService {
  private _dataSubject = new BehaviorSubject<
    IndividualModelType<IWeatherResponse>
  >(null);
  data$ = this._dataSubject.asObservable();

  set data(data: IndividualModelType<IWeatherResponse>) {
    this._dataSubject.next(data);
  }
}
