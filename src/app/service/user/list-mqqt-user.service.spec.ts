import { TestBed } from '@angular/core/testing';

import { ListMqqtUserService } from './list-mqqt-user.service';

describe('ListMqqtUserService', () => {
  let service: ListMqqtUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListMqqtUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
