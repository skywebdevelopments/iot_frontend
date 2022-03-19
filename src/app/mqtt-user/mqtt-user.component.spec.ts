import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttUserComponent } from './mqtt-user.component';

describe('MqttUserComponent', () => {
  let component: MqttUserComponent;
  let fixture: ComponentFixture<MqttUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqttUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
