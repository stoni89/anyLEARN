import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusChangeItemComponent } from './status-change-item.component';

describe('StatusChangeItemComponent', () => {
  let component: StatusChangeItemComponent;
  let fixture: ComponentFixture<StatusChangeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusChangeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusChangeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
