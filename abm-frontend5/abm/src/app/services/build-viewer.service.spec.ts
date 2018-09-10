import { TestBed, inject } from '@angular/core/testing';

import { BuildViewerService } from './build-viewer.service';

fdescribe('BuildViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildViewerService]
    });
  });

  fit('should be created', inject([BuildViewerService], (service: BuildViewerService) => {
    expect(service).toBeTruthy();
  }));
});
