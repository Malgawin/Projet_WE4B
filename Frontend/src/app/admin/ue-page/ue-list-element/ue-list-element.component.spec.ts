import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeListElementComponent } from './ue-list-element.component';

describe('UeListElementComponent', () => {
  let component: UeListElementComponent;
  let fixture: ComponentFixture<UeListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UeListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UeListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
