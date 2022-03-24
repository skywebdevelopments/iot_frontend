import { TestBed } from '@angular/core/testing';

import { UpdateNodeService } from './update-node.service';

describe('UpdateNodeService', () => {
  let service: UpdateNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
