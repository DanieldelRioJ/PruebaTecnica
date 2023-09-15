import { TestBed } from '@angular/core/testing';

import { LoginCardFormService } from './login-card-form.service';

describe('LoginCardFormService', () => {
  let service: LoginCardFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginCardFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
