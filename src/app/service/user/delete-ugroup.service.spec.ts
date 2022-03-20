import { TestBed } from '@angular/core/testing';

import { DeleteUgroupService } from './delete-ugroup.service';

describe('DeleteUgroupService', () => {
  let service: DeleteUgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
