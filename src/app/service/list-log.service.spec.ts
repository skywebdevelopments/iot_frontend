import { TestBed } from '@angular/core/testing';

import { ListLogService } from './list-log.service';

describe('ListLogService', () => {
  let service: ListLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
