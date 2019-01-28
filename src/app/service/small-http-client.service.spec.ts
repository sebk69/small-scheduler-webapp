import { TestBed } from '@angular/core/testing';

import { SmallHttpClientService } from './small-http-client.service';

describe('SmallHttpClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmallHttpClientService = TestBed.get(SmallHttpClientService);
    expect(service).toBeTruthy();
  });
});
