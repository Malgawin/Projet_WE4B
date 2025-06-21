import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTextComponent } from './form-create-text.component';

describe('FormCreateTextComponent', () => {
  let component: FormCreateTextComponent;
  let fixture: ComponentFixture<FormCreateTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
