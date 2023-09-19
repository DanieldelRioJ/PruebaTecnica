import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutputSummaryComponent } from './main-output-summary.component';

describe('MainOutputSummaryComponent', () => {
  let component: MainOutputSummaryComponent;
  let fixture: ComponentFixture<MainOutputSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOutputSummaryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainOutputSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
