import { TestBed } from '@angular/core/testing';

import { AddUgroupService } from './add-ugroup.service';

describe('AddUgroupService', () => {
  let service: AddUgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddUgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
