import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillverwaltungListComponent } from './skillverwaltung-list.component';

describe('SkillverwaltungListComponent', () => {
  let component: SkillverwaltungListComponent;
  let fixture: ComponentFixture<SkillverwaltungListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillverwaltungListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillverwaltungListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
