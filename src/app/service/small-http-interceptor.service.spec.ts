import { TestBed } from '@angular/core/testing';

import { SmallHttpInterceptorService } from './small-http-interceptor.service';

describe('SmallHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmallHttpInterceptorService = TestBed.get(SmallHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
