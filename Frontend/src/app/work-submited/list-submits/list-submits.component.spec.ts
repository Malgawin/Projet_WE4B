import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmitsComponent } from './list-submits.component';

describe('ListSubmitsComponent', () => {
  let component: ListSubmitsComponent;
  let fixture: ComponentFixture<ListSubmitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubmitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubmitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
