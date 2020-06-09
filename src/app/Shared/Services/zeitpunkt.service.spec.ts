import { TestBed } from '@angular/core/testing';

import { ZeitpunktService } from './zeitpunkt.service';

describe('ZeitpunktService', () => {
  let service: ZeitpunktService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZeitpunktService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
