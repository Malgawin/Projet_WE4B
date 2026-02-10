import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsDetailsComponent } from './participants-details.component';

describe('ParticipantsDetailsComponent', () => {
  let component: ParticipantsDetailsComponent;
  let fixture: ComponentFixture<ParticipantsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
