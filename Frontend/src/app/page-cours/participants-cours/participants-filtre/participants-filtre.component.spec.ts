import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsFiltreComponent } from './participants-filtre.component';

describe('ParticipantsFiltreComponent', () => {
  let component: ParticipantsFiltreComponent;
  let fixture: ComponentFixture<ParticipantsFiltreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsFiltreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
