import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillverwaltungSkillstatusDialogComponent } from './skillverwaltung-skillstatus-dialog.component';

describe('SkillverwaltungSkillstatusDialogComponent', () => {
  let component: SkillverwaltungSkillstatusDialogComponent;
  let fixture: ComponentFixture<SkillverwaltungSkillstatusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillverwaltungSkillstatusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillverwaltungSkillstatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
