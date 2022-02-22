import { TestBed } from '@angular/core/testing';

import { ListUsernameUsersService } from './list-username-users.service';

describe('ListUsernameUsersService', () => {
  let service: ListUsernameUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListUsernameUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
