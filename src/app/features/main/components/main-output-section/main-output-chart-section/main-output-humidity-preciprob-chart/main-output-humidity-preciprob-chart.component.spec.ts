import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutputHumidityPreciprobChartComponent } from './main-output-humidity-preciprob-chart.component';

describe('MainOutputHumidityPreciprobChartComponent', () => {
  let component: MainOutputHumidityPreciprobChartComponent;
  let fixture: ComponentFixture<MainOutputHumidityPreciprobChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOutputHumidityPreciprobChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(
      MainOutputHumidityPreciprobChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
