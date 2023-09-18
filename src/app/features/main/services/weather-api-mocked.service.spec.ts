import { TestBed } from '@angular/core/testing';

import { WeatherApiMockedService } from './weather-api-mocked.service';

describe('WeatherApiMockedService', () => {
  let service: WeatherApiMockedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherApiMockedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
