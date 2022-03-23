import { TestBed } from '@angular/core/testing';

import { UpdateEntityService } from './update-entity.service';

describe('UpdateEntityService', () => {
  let service: UpdateEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
