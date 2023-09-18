import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutputSolarRadiationChartComponent } from './main-output-solar-radiation-chart.component';

describe('MainOutputSolarRadiationChartComponent', () => {
  let component: MainOutputSolarRadiationChartComponent;
  let fixture: ComponentFixture<MainOutputSolarRadiationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MainOutputSolarRadiationChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOutputSolarRadiationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
