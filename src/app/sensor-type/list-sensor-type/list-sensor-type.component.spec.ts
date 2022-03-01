import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSensorTypeComponent } from './list-sensor-type.component';

describe('ListSensorTypeComponent', () => {
  let component: ListSensorTypeComponent;
  let fixture: ComponentFixture<ListSensorTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSensorTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSensorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
