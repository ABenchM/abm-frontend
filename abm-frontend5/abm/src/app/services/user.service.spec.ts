import { TestBed, inject,fakeAsync, tick } from '@angular/core/testing';
import {
  JsonpModule,
  Jsonp,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule
} from "@angular/http";
import { OrderPipe } from 'ngx-order-pipe';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {MockBackend} from "@angular/http/testing";
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {

  
  let service: UserService;
  let backend: MockBackend;
  let model = new User('', '', '', '', '', '','', false);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPipe ],
      imports: [HttpModule],
      providers: [UserService, MockBackend,HttpClient, HttpHandler,
        BaseRequestOptions,{
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }]
    });

    // Get the MockBackend
    backend = TestBed.get(MockBackend);

    // Returns a service with the MockBackend so we can test with dummy responses
    service = TestBed.get(UserService);

  });

  fit('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  fit('search should return SearchItems', fakeAsync(() => {
    
    let response = {
      "resultCount": 1,
      "results": [
        {
          affiliation: "nvlfj",
          approved: false,
          email: "hh@hh.com",
          firstname: "scvfacv",
          lastname: "caedfea",
          locked: false,
          password: null,
          role: "RegisteredUser",
          token: null,
          username: "cnoiwe"
        }]
    };

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response)
      }));
    });

    // Perform a request and make sure we get the response we expect
    service.getAllUsers(true).subscribe(response => {
      this.usersList = JSON.stringify(response)
    });
    tick();

    expect(service.getAllUsers.length).toBe(1);
    // expect(service.results[0].artist).toBe("U2");
    // expect(service.results[0].name).toBe("Beautiful Day");
    // expect(service.results[0].thumbnail).toBe("image.jpg");
    // expect(service.results[0].artistId).toBe(78500);
  }));
});


