import { TestBed } from '@angular/core/testing';

import { DeleteMqttuserService } from './delete-mqttuser.service';

describe('DeleteMqttuserService', () => {
  let service: DeleteMqttuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteMqttuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
