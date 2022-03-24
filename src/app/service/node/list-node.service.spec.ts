import { TestBed } from '@angular/core/testing';

import { ListNodeService } from './list-node.service';

describe('ListNodeService', () => {
  let service: ListNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
