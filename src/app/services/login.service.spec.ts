import { TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { } from 'jasmine';
import { Login } from './login.service';
import { Credentials } from '../models/credentials.model';

describe('Login', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [Login]
    });
  });

  it('should be created', inject([Login], (service: Login) => {
    expect(service).toBeTruthy();
  }));
  it('Login Success', inject([Login], (service: Login) => {
     service.postLoginForm(new Credentials('demo', 'demo'))
      .subscribe(
        data => expect(data).toBe(200),
        err => err);
  }));
  it('Login Success', inject([Login], (service: Login) => {
    service.postLoginForm(new Credentials('demo', '123'))
     .subscribe(
       data => data,
       err => expect(err).toBe(404));
 }));
});
