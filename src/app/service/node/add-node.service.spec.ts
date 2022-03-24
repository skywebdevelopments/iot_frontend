import { TestBed } from '@angular/core/testing';

import { AddNodeService } from './add-node.service';

describe('AddNodeService', () => {
  let service: AddNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
