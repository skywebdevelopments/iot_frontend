import { TestBed } from '@angular/core/testing';

import { MapGroupSensorService } from './map-group-sensor.service';

describe('MapGroupSensorService', () => {
  let service: MapGroupSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapGroupSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
