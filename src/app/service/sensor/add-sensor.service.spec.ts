import { TestBed } from '@angular/core/testing';

import { AddSensorService } from './add-sensor.service';
//
describe('AddSensorService', () => {
  let service: AddSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
