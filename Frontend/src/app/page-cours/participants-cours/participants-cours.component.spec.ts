import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsCoursComponent } from './participants-cours.component';

describe('ParticipantsCoursComponent', () => {
  let component: ParticipantsCoursComponent;
  let fixture: ComponentFixture<ParticipantsCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
