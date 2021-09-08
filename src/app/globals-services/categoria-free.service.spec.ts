/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoriaFreeService } from './categoria-free.service';

describe('Service: CategoriaFree', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaFreeService]
    });
  });

  it('should ...', inject([CategoriaFreeService], (service: CategoriaFreeService) => {
    expect(service).toBeTruthy();
  }));
});
