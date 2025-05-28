import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteCoursEtendueComponent } from './carte-cours-etendue.component';

describe('CarteCoursEtendueComponent', () => {
  let component: CarteCoursEtendueComponent;
  let fixture: ComponentFixture<CarteCoursEtendueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteCoursEtendueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteCoursEtendueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
