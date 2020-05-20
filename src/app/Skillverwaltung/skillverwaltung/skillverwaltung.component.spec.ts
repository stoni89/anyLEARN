import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillverwaltungComponent } from './skillverwaltung.component';

describe('SkillverwaltungComponent', () => {
  let component: SkillverwaltungComponent;
  let fixture: ComponentFixture<SkillverwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillverwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillverwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
