/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenGuardService } from './token-guard.service';

describe('Service: TokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenGuardService]
    });
  });

  it('should ...', inject([TokenGuardService], (service: TokenGuardService) => {
    expect(service).toBeTruthy();
  }));
});
