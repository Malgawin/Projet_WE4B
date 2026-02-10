import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreSearchComponent } from './filtre-search.component';

describe('FiltreSearchComponent', () => {
  let component: FiltreSearchComponent;
  let fixture: ComponentFixture<FiltreSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
