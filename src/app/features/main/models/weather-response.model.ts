export interface IWeatherResponse {
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  days: IWeatherDay[];
}

export interface IWeatherDay {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  humidity: number;
  precipprob: number;
  windspeed: number;
  solarradiation: number;
}
