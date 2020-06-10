import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillverwaltungLinksItemComponent } from './skillverwaltung-links-item.component';

describe('SkillverwaltungLinksItemComponent', () => {
  let component: SkillverwaltungLinksItemComponent;
  let fixture: ComponentFixture<SkillverwaltungLinksItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillverwaltungLinksItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillverwaltungLinksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
