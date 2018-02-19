import { TestBed, inject } from '@angular/core/testing';

import { AwsInterceptorService } from './aws-interceptor.service';

describe('AwsInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsInterceptorService]
    });
  });

  it('should be created', inject([AwsInterceptorService], (service: AwsInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
