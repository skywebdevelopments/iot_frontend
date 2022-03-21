import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorProvisionComponent } from './sensor-provision.component';

describe('SensorProvisionComponent', () => {
  let component: SensorProvisionComponent;
  let fixture: ComponentFixture<SensorProvisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorProvisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorProvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
