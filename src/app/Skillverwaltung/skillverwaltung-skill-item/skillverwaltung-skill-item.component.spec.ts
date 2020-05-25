import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillverwaltungSkillItemComponent } from './skillverwaltung-skill-item.component';

describe('SkillverwaltungSkillItemComponent', () => {
  let component: SkillverwaltungSkillItemComponent;
  let fixture: ComponentFixture<SkillverwaltungSkillItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillverwaltungSkillItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillverwaltungSkillItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
