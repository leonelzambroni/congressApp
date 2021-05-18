import { TestBed } from '@angular/core/testing';

import { CongressInterceptorService } from './congress-interceptor.service';

describe('CongressInterceptorService', () => {
  let service: CongressInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongressInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
