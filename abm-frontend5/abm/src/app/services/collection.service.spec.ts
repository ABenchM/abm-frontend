import { TestBed, inject } from '@angular/core/testing';

import { CollectionService } from './collection.service';
import { HttpModule } from '@angular/http';

describe('CollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [CollectionService]
    });
  });

  fit('should be created', inject([CollectionService], (service: CollectionService) => {
    expect(service).toBeTruthy();
  }));
});
