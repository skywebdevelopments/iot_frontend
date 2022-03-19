import { TestBed } from '@angular/core/testing';

import { UpdateUgroupService } from './update-ugroup.service';

describe('UpdateUgroupService', () => {
  let service: UpdateUgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
