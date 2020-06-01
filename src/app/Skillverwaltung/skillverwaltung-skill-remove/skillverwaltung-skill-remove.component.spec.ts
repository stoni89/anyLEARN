import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillverwaltungSkillRemoveComponent } from './skillverwaltung-skill-remove.component';

describe('SkillverwaltungSkillRemoveComponent', () => {
  let component: SkillverwaltungSkillRemoveComponent;
  let fixture: ComponentFixture<SkillverwaltungSkillRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillverwaltungSkillRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillverwaltungSkillRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
