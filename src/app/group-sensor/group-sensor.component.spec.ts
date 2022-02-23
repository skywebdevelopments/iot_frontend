import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSensorComponent } from './group-sensor.component';

describe('GroupSensorComponent', () => {
  let component: GroupSensorComponent;
  let fixture: ComponentFixture<GroupSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
