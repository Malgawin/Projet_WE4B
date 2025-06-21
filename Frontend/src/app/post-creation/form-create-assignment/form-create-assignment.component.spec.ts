import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAssignmentComponent } from './form-create-assignment.component';

describe('FormCreateAssignmentComponent', () => {
  let component: FormCreateAssignmentComponent;
  let fixture: ComponentFixture<FormCreateAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
