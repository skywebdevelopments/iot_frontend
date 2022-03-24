import { TestBed } from '@angular/core/testing';

import { DeleteNodeService } from './delete-node.service';

describe('DeleteNodeService', () => {
  let service: DeleteNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
