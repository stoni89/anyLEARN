import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCloseDialogComponent } from './dashboard-close-dialog.component';

describe('DashboardCloseDialogComponent', () => {
  let component: DashboardCloseDialogComponent;
  let fixture: ComponentFixture<DashboardCloseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCloseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCloseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
