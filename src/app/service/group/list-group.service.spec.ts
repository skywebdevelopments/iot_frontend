import { TestBed } from '@angular/core/testing';

import { ListGroupService } from './list-group.service';

describe('ListGroupService', () => {
  let service: ListGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
