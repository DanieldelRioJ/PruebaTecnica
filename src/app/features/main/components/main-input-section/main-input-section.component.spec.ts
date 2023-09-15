import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInputSectionComponent } from './main-input-section.component';

describe('MainInputSectionComponent', () => {
  let component: MainInputSectionComponent;
  let fixture: ComponentFixture<MainInputSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainInputSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainInputSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
