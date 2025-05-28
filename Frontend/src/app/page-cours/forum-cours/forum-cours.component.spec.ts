import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCoursComponent } from './forum-cours.component';

describe('ForumCoursComponent', () => {
  let component: ForumCoursComponent;
  let fixture: ComponentFixture<ForumCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
