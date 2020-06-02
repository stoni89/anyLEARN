import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelektierenListComponent } from './selektieren-list.component';

describe('SelektierenListComponent', () => {
  let component: SelektierenListComponent;
  let fixture: ComponentFixture<SelektierenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelektierenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelektierenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
