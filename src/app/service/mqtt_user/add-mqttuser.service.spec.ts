import { TestBed } from '@angular/core/testing';

import { AddMqttuserService } from './add-mqttuser.service';

describe('AddMqttuserService', () => {
  let service: AddMqttuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMqttuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
