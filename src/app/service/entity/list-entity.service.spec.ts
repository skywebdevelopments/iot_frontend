import { TestBed } from '@angular/core/testing';

import { ListEntityService } from './list-entity.service';

describe('ListEntityService', () => {
  let service: ListEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
