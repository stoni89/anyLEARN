import { TestBed } from '@angular/core/testing';

import { SkillkategorieService } from './skillkategorie.service';

describe('SkillkategorieService', () => {
  let service: SkillkategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillkategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
