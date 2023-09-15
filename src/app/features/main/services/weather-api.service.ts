import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly BASE_URL = environment.API_URL;

  constructor(private readonly _apiService: ApiService) {}

  getData(location: string) {
    return this._apiService.get<string>(`${this.BASE_URL}/${location}`, {
      unitGroup: 'metric',
      contentType: 'json'
    });
  }
}
