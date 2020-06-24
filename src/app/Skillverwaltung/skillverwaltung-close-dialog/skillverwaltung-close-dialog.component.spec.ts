import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillverwaltungCloseDialogComponent } from './skillverwaltung-close-dialog.component';

describe('SkillverwaltungCloseDialogComponent', () => {
  let component: SkillverwaltungCloseDialogComponent;
  let fixture: ComponentFixture<SkillverwaltungCloseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillverwaltungCloseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillverwaltungCloseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
