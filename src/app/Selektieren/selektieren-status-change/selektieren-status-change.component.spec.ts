import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelektierenStatusChangeComponent } from './selektieren-status-change.component';

describe('SelektierenStatusChangeComponent', () => {
  let component: SelektierenStatusChangeComponent;
  let fixture: ComponentFixture<SelektierenStatusChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelektierenStatusChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelektierenStatusChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
