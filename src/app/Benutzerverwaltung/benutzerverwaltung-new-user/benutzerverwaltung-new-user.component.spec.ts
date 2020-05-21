import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenutzerverwaltungNewUserComponent } from './benutzerverwaltung-new-user.component';

describe('BenutzerverwaltungNewUserComponent', () => {
  let component: BenutzerverwaltungNewUserComponent;
  let fixture: ComponentFixture<BenutzerverwaltungNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenutzerverwaltungNewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenutzerverwaltungNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
