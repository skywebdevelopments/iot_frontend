import { TestBed } from '@angular/core/testing';

import { AuthorizeRoleService } from './authorize-role.service';

describe('AuthorizeRoleService', () => {
  let service: AuthorizeRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizeRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
