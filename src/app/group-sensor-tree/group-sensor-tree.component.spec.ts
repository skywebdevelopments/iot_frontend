import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSensorTreeComponent } from './group-sensor-tree.component';

describe('GroupSensorTreeComponent', () => {
  let component: GroupSensorTreeComponent;
  let fixture: ComponentFixture<GroupSensorTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSensorTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSensorTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
