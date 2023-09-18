import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';
import { IWeatherResponse } from '../models/weather-response.model';
import { IWeatherInput } from '../models/weather-input.model';
import { WeatherApiInterfaceService } from './weather-api-interface.service';

@Injectable()
export class WeatherApiService extends WeatherApiInterfaceService {
  private readonly BASE_URL = environment.API_URL;

  constructor(private readonly _apiService: ApiService) {
    super();
  }

  getData(params: IWeatherInput) {
    return this._apiService.get<IWeatherResponse>(
      `${this.BASE_URL}/${params.location}/${params.from}/${params.to}`,
      {
        unitGroup: 'metric',
        contentType: 'json'
      }
    );
  }
}
