import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCoursEtendueComponent } from './liste-cours-etendue.component';

describe('ListeCoursEtendueComponent', () => {
  let component: ListeCoursEtendueComponent;
  let fixture: ComponentFixture<ListeCoursEtendueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCoursEtendueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCoursEtendueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
