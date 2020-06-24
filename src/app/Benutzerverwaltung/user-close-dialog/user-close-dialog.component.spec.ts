import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCloseDialogComponent } from './user-close-dialog.component';

describe('UserCloseDialogComponent', () => {
  let component: UserCloseDialogComponent;
  let fixture: ComponentFixture<UserCloseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCloseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCloseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
