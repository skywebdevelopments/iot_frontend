import { TestBed } from '@angular/core/testing';

import { ListRolesService } from './list-roles.service';

describe('ListRolesService', () => {
  let service: ListRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
