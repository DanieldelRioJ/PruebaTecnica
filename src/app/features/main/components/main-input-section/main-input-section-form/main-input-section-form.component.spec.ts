import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInputSectionFormComponent } from './main-input-section-form.component';

describe('MainInputSectionFormComponent', () => {
  let component: MainInputSectionFormComponent;
  let fixture: ComponentFixture<MainInputSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainInputSectionFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainInputSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
