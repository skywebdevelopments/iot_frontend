import { TestBed } from '@angular/core/testing';

import { SensorProvisioService } from './sensor-provisio.service';

describe('SensorProvisioService', () => {
  let service: SensorProvisioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorProvisioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
