import { TestBed } from '@angular/core/testing';

import { LoginLogoutService } from './loginlogout.service';

describe('LoginlogoutService', () => {
  let service: LoginLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
