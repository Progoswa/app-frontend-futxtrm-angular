/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CargaService } from './carga.service';

describe('Service: Carga', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargaService]
    });
  });

  it('should ...', inject([CargaService], (service: CargaService) => {
    expect(service).toBeTruthy();
  }));
});
