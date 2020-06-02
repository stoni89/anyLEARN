import { TestBed } from '@angular/core/testing';

import { SelektierenService } from './selektieren.service';

describe('SelektierenService', () => {
  let service: SelektierenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelektierenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
