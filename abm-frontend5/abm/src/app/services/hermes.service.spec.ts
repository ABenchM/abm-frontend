import { TestBed, inject } from '@angular/core/testing';

import { HermesService } from './hermes.service';

describe('HermesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HermesService]
    });
  });

  it('should be created', inject([HermesService], (service: HermesService) => {
    expect(service).toBeTruthy();
  }));
});
