import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSkillListComponent } from './dashboard-skill-list.component';

describe('DashboardSkillListComponent', () => {
  let component: DashboardSkillListComponent;
  let fixture: ComponentFixture<DashboardSkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSkillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
