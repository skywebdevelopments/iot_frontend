import { TestBed } from '@angular/core/testing';

import { DeleteGroupService } from './delete-group.service';

describe('DeleteGroupService', () => {
  let service: DeleteGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
