import { TestBed } from '@angular/core/testing';

import { RingService } from './ring.service';

describe('RingService', () => {
  let service: RingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
