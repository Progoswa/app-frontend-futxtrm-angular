/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoCategorieService } from './no-categorie.service';

describe('Service: NoCategorie', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoCategorieService]
    });
  });

  it('should ...', inject([NoCategorieService], (service: NoCategorieService) => {
    expect(service).toBeTruthy();
  }));
});
