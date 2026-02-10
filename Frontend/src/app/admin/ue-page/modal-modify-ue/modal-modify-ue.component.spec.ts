import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifyUeComponent } from './modal-modify-ue.component';

describe('ModalModifyUeComponent', () => {
  let component: ModalModifyUeComponent;
  let fixture: ComponentFixture<ModalModifyUeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalModifyUeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModifyUeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
