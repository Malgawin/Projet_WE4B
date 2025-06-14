import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteCoursComponent } from './activite-cours.component';

describe('ActiviteCoursComponent', () => {
  let component: ActiviteCoursComponent;
  let fixture: ComponentFixture<ActiviteCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
