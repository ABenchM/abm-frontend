import { TestBed, inject } from '@angular/core/testing';

import { ViewService } from './view.service';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterModule, RouterTestingModule],
      providers: [ViewService]
    });
  });

  fit('should be created', inject([ViewService], (service: ViewService) => {
    expect(service).toBeTruthy();
  }));
});
