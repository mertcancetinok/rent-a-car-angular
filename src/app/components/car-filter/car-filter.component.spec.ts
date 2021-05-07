import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarfilterComponent } from './car-filter.component';

describe('CarfilterComponent', () => {
  let component: CarfilterComponent;
  let fixture: ComponentFixture<CarfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarfilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
