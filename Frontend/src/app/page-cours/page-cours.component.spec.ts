import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCoursComponent } from './page-cours.component';

describe('PageCoursComponent', () => {
  let component: PageCoursComponent;
  let fixture: ComponentFixture<PageCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
