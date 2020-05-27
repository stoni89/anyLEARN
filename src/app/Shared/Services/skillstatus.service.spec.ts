import { TestBed } from '@angular/core/testing';

import { SkillstatusService } from './skillstatus.service';

describe('SkillstatusService', () => {
  let service: SkillstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
