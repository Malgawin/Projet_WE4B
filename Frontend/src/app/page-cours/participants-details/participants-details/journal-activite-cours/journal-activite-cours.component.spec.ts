import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalActiviteCoursComponent } from './journal-activite-cours.component';

describe('JournalActiviteCoursComponent', () => {
  let component: JournalActiviteCoursComponent;
  let fixture: ComponentFixture<JournalActiviteCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalActiviteCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalActiviteCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
