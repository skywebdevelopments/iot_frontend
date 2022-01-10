import { TestBed } from '@angular/core/testing';

import { UpdateSensorService } from './update-sensor.service';

describe('UpdateSensorService', () => {
  let service: UpdateSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
