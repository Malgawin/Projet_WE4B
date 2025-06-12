import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredListElementComponent } from './registered-list-element.component';

describe('RegisteredListElementComponent', () => {
  let component: RegisteredListElementComponent;
  let fixture: ComponentFixture<RegisteredListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
