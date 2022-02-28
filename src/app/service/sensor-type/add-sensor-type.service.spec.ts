import { TestBed } from '@angular/core/testing';

import { AddSensorTypeService } from './add-sensor-type.service';

describe('AddSensorTypeService', () => {
  let service: AddSensorTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSensorTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
