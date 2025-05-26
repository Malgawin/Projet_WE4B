import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCoursCarteComponent } from './liste-cours-carte.component';

describe('ListeCoursCarteComponent', () => {
  let component: ListeCoursCarteComponent;
  let fixture: ComponentFixture<ListeCoursCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCoursCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCoursCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
