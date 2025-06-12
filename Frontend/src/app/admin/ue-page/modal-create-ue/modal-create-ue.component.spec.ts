import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateUeComponent } from './modal-create-ue.component';

describe('ModalCreateUeComponent', () => {
  let component: ModalCreateUeComponent;
  let fixture: ComponentFixture<ModalCreateUeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateUeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateUeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
