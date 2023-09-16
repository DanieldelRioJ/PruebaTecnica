import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutputTemperatureChartComponent } from './main-output-temperature-chart.component';

describe('MainOutputTemperatureChartComponent', () => {
  let component: MainOutputTemperatureChartComponent;
  let fixture: ComponentFixture<MainOutputTemperatureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOutputTemperatureChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainOutputTemperatureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
