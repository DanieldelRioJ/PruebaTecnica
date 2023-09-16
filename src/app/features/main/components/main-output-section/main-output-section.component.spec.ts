import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutputSectionComponent } from './main-output-section.component';

describe('MainOutputSectionComponent', () => {
  let component: MainOutputSectionComponent;
  let fixture: ComponentFixture<MainOutputSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOutputSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainOutputSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
