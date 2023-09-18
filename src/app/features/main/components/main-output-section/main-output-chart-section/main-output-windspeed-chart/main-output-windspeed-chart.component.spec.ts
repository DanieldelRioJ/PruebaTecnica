import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutputWindspeedChartComponent } from './main-output-windspeed-chart.component';

describe('MainOutputWindspeedChartComponent', () => {
  let component: MainOutputWindspeedChartComponent;
  let fixture: ComponentFixture<MainOutputWindspeedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOutputWindspeedChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainOutputWindspeedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
