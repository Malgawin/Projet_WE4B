import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteGeneralComponent } from './activite-general.component';

describe('ActiviteGeneralComponent', () => {
  let component: ActiviteGeneralComponent;
  let fixture: ComponentFixture<ActiviteGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
