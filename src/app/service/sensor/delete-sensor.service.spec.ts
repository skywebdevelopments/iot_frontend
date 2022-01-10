import { TestBed } from '@angular/core/testing';

import { DeleteSensorService } from './delete-sensor.service';

describe('DeleteSensorService', () => {
  let service: DeleteSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
