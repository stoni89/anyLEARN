import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSkillInfoComponent } from './post-skill-info.component';

describe('PostSkillInfoComponent', () => {
  let component: PostSkillInfoComponent;
  let fixture: ComponentFixture<PostSkillInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSkillInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSkillInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
