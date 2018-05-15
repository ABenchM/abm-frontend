import { TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule} from '@angular/http';
import {} from 'jasmine';
import { Login } from './login.service';

fdescribe('Login', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [Login]
    });
  });

  it('should be created', inject([Login], (service: Login) => {
    expect(service).toBeTruthy();
  }));
});
