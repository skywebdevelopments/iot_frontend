import { TestBed } from '@angular/core/testing';

import { GenerateTokenService } from './generate-token.service';

describe('GenerateTokenService', () => {
  let service: GenerateTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
