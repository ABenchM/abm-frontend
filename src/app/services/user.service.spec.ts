import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http, ConnectionBackend, HttpModule } from '@angular/http';
import { OrderPipe } from 'ngx-order-pipe';
import { RequestMethod } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPipe],
      imports: [HttpModule],
      providers: [HttpClient, HttpHandler, {
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
          body: '[{"firstname": "Rob","username": "vjv"},{"firstname": "Hugo","username": "abc"}]'
        });
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
      userService.approveRejectUser('vjv', true).subscribe((response) => {
      });
    })));

  fit('deleteUsers should be called with the correct request parameters', inject([UserService, MockBackend],
    fakeAsync((userService: UserService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.method).toBe(RequestMethod.Delete);
        expect(conn.request.url).toBe('/rest/adminDeleteUsers/vjv');
      });
      userService.deleteUsers('vjv').subscribe(() => {
      });
      tick();
    })));

  fit('lockunlockUser should be called with the correct request parameters', inject([UserService, MockBackend],
    fakeAsync((userService: UserService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.method).toBe(RequestMethod.Post);
        expect(conn.request.url).toBe('/rest/userlockunlock');
        expect(conn.request.json().username).toBe('vjv');
        expect(conn.request.json().isLock).toBe(true);
        conn.mockRespond(new Response(new ResponseOptions({ status: 201 })));
      });
      userService.lockunlockUser(new User('vjv', '', '', '', '', '', '', '', false), true).subscribe(() => {
      });
    })));

  fit('updateUserRole should be called with the correct request parameters', inject([UserService, MockBackend],
    fakeAsync((userService: UserService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.method).toBe(RequestMethod.Put);
        expect(conn.request.url).toBe('/rest/roleupdate');
        expect(conn.request.json().username).toBe('vjv');
        expect(conn.request.json().rolename).toBe('UserAdmin');
        conn.mockRespond(new Response(new ResponseOptions({ status: 201 })));
      });
      userService.updateUserRole(new User('vjv', '', '', '', '', '', '', '', false), 'UserAdmin').subscribe(() => {
      });
    })));

  fit('error handler is called if there is an error in server response', inject([UserService, MockBackend],
    fakeAsync((userService: UserService, mockBackend: MockBackend) => {
      let window = spyOn(userService, 'handleError');
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockError(new Error('some error'));
      });
      userService.approveRejectUser('vjv', true).subscribe((response) => {
      });
      tick();
      expect(window).toHaveBeenCalled();
    })));

});
