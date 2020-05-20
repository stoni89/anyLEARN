import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenutzerverwaltungListComponent } from './benutzerverwaltung-list.component';

describe('BenutzerverwaltungListComponent', () => {
  let component: BenutzerverwaltungListComponent;
  let fixture: ComponentFixture<BenutzerverwaltungListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenutzerverwaltungListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenutzerverwaltungListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
