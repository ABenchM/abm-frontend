import { TestBed, inject } from '@angular/core/testing';

import { CommitService } from './commit.service';
import { HttpModule } from '@angular/http';

describe('CommitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [CommitService]
    });
  });

  fit('should be created', inject([CommitService], (service: CommitService) => {
    expect(service).toBeTruthy();
  }));
});
