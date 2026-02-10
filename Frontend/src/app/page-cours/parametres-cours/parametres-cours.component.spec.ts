import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresCoursComponent } from './parametres-cours.component';

describe('ParametresCoursComponent', () => {
  let component: ParametresCoursComponent;
  let fixture: ComponentFixture<ParametresCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametresCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
