import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsAddUserComponent } from './participants-add-user.component';

describe('ParticipantsAddUserComponent', () => {
  let component: ParticipantsAddUserComponent;
  let fixture: ComponentFixture<ParticipantsAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsAddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
