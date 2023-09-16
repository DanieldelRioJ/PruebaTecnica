import { TestBed } from '@angular/core/testing';

import { MainOutputTemperatureChartService } from './main-output-temperature-chart.service';

describe('MainOutputTemperatureChartService', () => {
  let service: MainOutputTemperatureChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainOutputTemperatureChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
