import { TestBed } from '@angular/core/testing';

import { GroupSensorService } from './group-sensor.service';

describe('GroupSensorService', () => {
  let service: GroupSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
