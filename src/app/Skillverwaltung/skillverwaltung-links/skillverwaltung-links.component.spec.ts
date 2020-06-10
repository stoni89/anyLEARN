import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillverwaltungLinksComponent } from './skillverwaltung-links.component';

describe('SkillverwaltungLinksComponent', () => {
  let component: SkillverwaltungLinksComponent;
  let fixture: ComponentFixture<SkillverwaltungLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillverwaltungLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillverwaltungLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
