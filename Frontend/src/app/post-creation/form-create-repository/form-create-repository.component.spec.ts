import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateRepositoryComponent } from './form-create-repository.component';

describe('FormCreateRepositoryComponent', () => {
  let component: FormCreateRepositoryComponent;
  let fixture: ComponentFixture<FormCreateRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateRepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
