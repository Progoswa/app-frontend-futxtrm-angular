/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PagosService } from './pagos.service';

describe('Service: Pagos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagosService]
    });
  });

  it('should ...', inject([PagosService], (service: PagosService) => {
    expect(service).toBeTruthy();
  }));
});
