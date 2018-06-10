import { TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule} from '@angular/http';
import {} from 'jasmine';
import { Register } from './register.service';

fdescribe('Register', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [Register]
    });
  });

 fit('should be created', inject([Register], (service: Register) => {
    expect(service).toBeTruthy();
  }));
});
