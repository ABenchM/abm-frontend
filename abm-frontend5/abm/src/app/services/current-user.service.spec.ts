import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { CurrentUserService } from './current-user.service';

describe('CurrentUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [CurrentUserService]
    });
  });

  fit('should be created', inject([CurrentUserService], (service: CurrentUserService) => {
    expect(service).toBeTruthy();
  }));
});