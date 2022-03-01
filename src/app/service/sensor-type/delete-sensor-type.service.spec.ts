import { TestBed } from '@angular/core/testing';

import { DeleteSensorTypeService } from './delete-sensor-type.service';

describe('DeleteSensorTypeService', () => {
  let service: DeleteSensorTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteSensorTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
