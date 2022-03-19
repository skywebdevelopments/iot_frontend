import { TestBed } from '@angular/core/testing';

import { UpdateMqttuserService } from './update-mqttuser.service';

describe('UpdateMqttuserService', () => {
  let service: UpdateMqttuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMqttuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
