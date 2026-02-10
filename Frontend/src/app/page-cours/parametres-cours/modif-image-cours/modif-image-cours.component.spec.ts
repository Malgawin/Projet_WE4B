import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifImageCoursComponent } from './modif-image-cours.component';

describe('ModifImageCoursComponent', () => {
  let component: ModifImageCoursComponent;
  let fixture: ComponentFixture<ModifImageCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifImageCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifImageCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
