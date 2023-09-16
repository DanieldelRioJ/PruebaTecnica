import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutputChartSectionComponent } from './main-output-chart-section.component';

describe('MainOutputChartSectionComponent', () => {
  let component: MainOutputChartSectionComponent;
  let fixture: ComponentFixture<MainOutputChartSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOutputChartSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainOutputChartSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
