import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteCoursComponent } from './carte-cours.component';

describe('CarteCoursComponent', () => {
  let component: CarteCoursComponent;
  let fixture: ComponentFixture<CarteCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
