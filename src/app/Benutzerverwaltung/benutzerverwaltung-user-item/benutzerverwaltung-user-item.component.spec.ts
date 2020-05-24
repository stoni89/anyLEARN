import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenutzerverwaltungUserItemComponent } from './benutzerverwaltung-user-item.component';

describe('BenutzerverwaltungNewUserComponent', () => {
  let component: BenutzerverwaltungUserItemComponent;
  let fixture: ComponentFixture<BenutzerverwaltungUserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenutzerverwaltungUserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenutzerverwaltungUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
