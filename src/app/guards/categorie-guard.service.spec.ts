/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategorieGuardService } from './categorie-guard.service';

describe('Service: CategorieGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorieGuardService]
    });
  });

  it('should ...', inject([CategorieGuardService], (service: CategorieGuardService) => {
    expect(service).toBeTruthy();
  }));
});
