/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FreeGuardService } from './free-guard.service';

describe('Service: FreeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreeGuardService]
    });
  });

  it('should ...', inject([FreeGuardService], (service: FreeGuardService) => {
    expect(service).toBeTruthy();
  }));
});
