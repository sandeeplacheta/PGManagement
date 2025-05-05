import { TestBed } from '@angular/core/testing';

import { LoctionService } from './loction.service';

describe('LoctionService', () => {
  let service: LoctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
