import { TestBed } from '@angular/core/testing';

import { ListSensorService } from './list-sensor.service';

describe('ListSensorService', () => {
  let service: ListSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
