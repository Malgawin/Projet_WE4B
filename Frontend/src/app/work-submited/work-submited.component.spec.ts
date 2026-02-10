import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSubmitedComponent } from './work-submited.component';

describe('WorkSubmitedComponent', () => {
  let component: WorkSubmitedComponent;
  let fixture: ComponentFixture<WorkSubmitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSubmitedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSubmitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
