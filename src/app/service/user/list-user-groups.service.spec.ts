import { TestBed } from '@angular/core/testing';

import { ListUserGroupsService } from './list-user-groups.service';

describe('ListUserGroupsService', () => {
  let service: ListUserGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListUserGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
