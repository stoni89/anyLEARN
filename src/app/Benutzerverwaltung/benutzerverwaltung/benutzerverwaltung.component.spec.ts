import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenutzerverwaltungComponent } from './benutzerverwaltung.component';

describe('BenutzerverwaltungComponent', () => {
  let component: BenutzerverwaltungComponent;
  let fixture: ComponentFixture<BenutzerverwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenutzerverwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenutzerverwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
