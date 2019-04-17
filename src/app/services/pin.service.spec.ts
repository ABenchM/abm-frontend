import { TestBed, inject } from '@angular/core/testing';

import { PinService } from './pin.service';
import { Http, HttpModule } from '@angular/http';

describe('PinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PinService]
    });
  });

  it('should be created', inject([PinService], (service: PinService) => {
    expect(service).toBeTruthy();
  }));
});
