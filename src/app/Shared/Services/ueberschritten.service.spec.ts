import { TestBed } from '@angular/core/testing';

import { UeberschrittenService } from './ueberschritten.service';

describe('UeberschrittenService', () => {
  let service: UeberschrittenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UeberschrittenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
