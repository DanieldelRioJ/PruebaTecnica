import { IWeatherInput } from '../models/weather-input.model';
import { Observable } from 'rxjs';
import { IWeatherResponse } from '../models/weather-response.model';

export abstract class WeatherApiInterfaceService {
  abstract getData(params: IWeatherInput): Observable<IWeatherResponse>;
}
