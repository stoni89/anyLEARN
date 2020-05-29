import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VermittlerChangeItemComponent } from './vermittler-change-item.component';

describe('VermittlerChangeItemComponent', () => {
  let component: VermittlerChangeItemComponent;
  let fixture: ComponentFixture<VermittlerChangeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VermittlerChangeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VermittlerChangeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
