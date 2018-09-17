import { TestBed, inject } from '@angular/core/testing';

import { HermesService } from './hermes.service';
import { HttpModule } from '@angular/http';

describe('HermesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [HermesService]
    });
  });

  fit('should be created', inject([HermesService], (service: HermesService) => {
    expect(service).toBeTruthy();
  }));
});
