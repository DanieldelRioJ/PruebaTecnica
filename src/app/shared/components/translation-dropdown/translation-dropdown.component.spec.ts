import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationDropdownComponent } from './translation-dropdown.component';

describe('TranslationDropdownComponent', () => {
  let component: TranslationDropdownComponent;
  let fixture: ComponentFixture<TranslationDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationDropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
