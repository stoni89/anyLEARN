import { TestBed } from '@angular/core/testing';

import { BereichService } from './bereich.service';

describe('BereichService', () => {
  let service: BereichService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BereichService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
