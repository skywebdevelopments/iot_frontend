import { TestBed } from '@angular/core/testing';

import { AddEntityService } from './add-entity.service';

describe('AddEntityService', () => {
  let service: AddEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
