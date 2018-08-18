import { TestBed, inject } from '@angular/core/testing';

import { BuildViewerService } from './build-viewer.service';

describe('BuildViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildViewerService]
    });
  });

  it('should be created', inject([BuildViewerService], (service: BuildViewerService) => {
    expect(service).toBeTruthy();
  }));
});
