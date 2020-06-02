import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelektierenComponent } from './selektieren.component';

describe('SelektierenComponent', () => {
  let component: SelektierenComponent;
  let fixture: ComponentFixture<SelektierenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelektierenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelektierenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
