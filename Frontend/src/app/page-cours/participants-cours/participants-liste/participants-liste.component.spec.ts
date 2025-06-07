import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsListeComponent } from './participants-liste.component';

describe('ParticipantsListeComponent', () => {
  let component: ParticipantsListeComponent;
  let fixture: ComponentFixture<ParticipantsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
