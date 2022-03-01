import { TestBed } from '@angular/core/testing';

import { UpdateSensorTypeService } from './update-sensor-type.service';

describe('UpdateSensorTypeService', () => {
  let service: UpdateSensorTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSensorTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
