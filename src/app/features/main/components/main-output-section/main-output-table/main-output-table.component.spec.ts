import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutputTableComponent } from './main-output-table.component';

describe('MainOutputTableComponent', () => {
  let component: MainOutputTableComponent;
  let fixture: ComponentFixture<MainOutputTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOutputTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainOutputTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
