import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDisplayRegisteredComponent } from './modal-display-registered.component';

describe('ModalDisplayRegisteredComponent', () => {
  let component: ModalDisplayRegisteredComponent;
  let fixture: ComponentFixture<ModalDisplayRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDisplayRegisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDisplayRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
