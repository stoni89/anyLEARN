import { TestBed } from '@angular/core/testing';

import { RollenService } from './rollen.service';

describe('RollenService', () => {
  let service: RollenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
