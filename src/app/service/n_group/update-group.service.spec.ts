import { TestBed } from '@angular/core/testing';

import { UpdateGroupService } from './update-group.service';

describe('UpdateGroupService', () => {
  let service: UpdateGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
