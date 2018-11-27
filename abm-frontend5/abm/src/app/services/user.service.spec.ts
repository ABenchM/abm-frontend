import { TestBed, inject,fakeAsync, tick } from '@angular/core/testing';
import {BaseRequestOptions,Response,ResponseOptions,Http,ConnectionBackend,HttpModule} from "@angular/http";
import { OrderPipe } from 'ngx-order-pipe';
import { RequestMethod } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {MockBackend, MockConnection} from "@angular/http/testing";
import { UserService } from './user.service';

describe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPipe ],
      imports: [HttpModule],
      providers: [HttpClient,HttpHandler,{
        provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
      },
      { provide: UserService, useClass: UserService },
      { provide: MockBackend, useClass: MockBackend },
      { provide: BaseRequestOptions, useClass: BaseRequestOptions }]
    });
  });

  fit('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  fit('getAllUsers should return list of users', inject([UserService, MockBackend], 
    fakeAsync((userService: UserService, mockBackend: MockBackend) => {
      let res: any;
      mockBackend.connections.subscribe(c => {
        let response = new ResponseOptions({
          body: '[{"affiliation": "ABM","email": "hh@hh.com","firstname": "Rob","lastname": "Mascherano","role": "RegisteredUser","username": "vjv"}, {"affiliation": "ABM","email": "hjklh@hh.com","firstname": "Hugo","lastname": "Mark","role": "RegisteredUser","username": "abc"}]'});
          c.mockRespond(new Response(response));
        });
        userService.getAllUsers(true).subscribe((response) => {
           res = response;              
        });
        tick();
        const responseArray = JSON.parse(res._body);
        expect(responseArray[0].username).toBe('vjv');
        expect(responseArray[1].firstname).toBe('Hugo');
        expect(responseArray.length).toBe(2);
    })));

    fit('should use the correct headers and url in the request', inject([UserService, MockBackend], 
      fakeAsync((userService: UserService, mockBackend: MockBackend) => {
        let contentType: any;
        mockBackend.connections.subscribe((conn: MockConnection) => {
          contentType = conn.request.headers.get('Content-Type');
          expect(contentType).not.toBeNull();
          expect(contentType).toEqual('application/json'); 
          expect(conn.request.url).toBe('/rest/approval');
        });
        userService.approveRejectUser("vjv",true).subscribe((response) => {              
       });
      })));

      fit('should yield the correct response', inject([UserService, MockBackend], 
        fakeAsync((userService: UserService, mockBackend: MockBackend) => {
          mockBackend.connections.subscribe((conn: MockConnection) => {
            expect(conn.request.method).toBe(RequestMethod.Get);
            conn.mockRespond(new Response(new ResponseOptions({status: 201})));
          });
          userService.getAllUsers(true).subscribe((successResult) => {
            expect(successResult).toBeDefined();
            expect(successResult.status).toBe(201);              
         });
        })));

      fit('error handler is called if there is an error in server response', inject([UserService, MockBackend], 
        fakeAsync((userService: UserService, mockBackend: MockBackend) => {
          let window= spyOn(userService,'handleError');
          mockBackend.connections.subscribe((conn: MockConnection) => {
            conn.mockError(new Error('some error'));
          });
          userService.approveRejectUser("vjv",true).subscribe((response) => {              
          });
          tick();
          expect(window).toHaveBeenCalled();          
         })));
  
});