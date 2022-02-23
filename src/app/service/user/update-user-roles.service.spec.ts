import { TestBed } from '@angular/core/testing';

import { UpdateUserRolesService } from './update-user-roles.service';

describe('UpdateUserRolesService', () => {
  let service: UpdateUserRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUserRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
