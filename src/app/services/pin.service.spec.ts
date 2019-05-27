//  import { TestBed } from '@angular/core/testing';
// import { PinService } from './pin.service';
// // import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import { HttpModule, Http, BaseRequestOptions, XHRBackend , ResponseOptions } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
// import {Collection} from '../models/collection.model';


// describe( 'PinService', () => {

//  // let httpTestingController: HttpTestingController;
//   let mockCollection ;
//   let mockHttp: Http;
//   let service: PinService;
//   let mockBackEnd: MockBackend;
//   beforeEach(() => {
//   mockHttp = jasmine.createSpyObj(['get']);
//    TestBed.configureTestingModule({
//     imports: [HttpModule],
//     providers: [
//         PinService,
//         MockBackend,
//         BaseRequestOptions,
//         // {provide: XHRBackend, useValue: MockBackend},
//         {provide: Http,
//           useFactory: (mockBackEnd, options) => new Http(mockBackEnd, options),
//         deps: [MockBackend, BaseRequestOptions]}
//     ]

//    });

//    mockCollection = {name: 'test', descrpition: 'test', creation_date: '23/05/2019', id: '1234',
//     pinned: true, privateStatus: false, isActive: true};
//  //  httpTestingController = TestBed.get(HttpTestingController);
//    service = TestBed.get(PinService);
//    mockBackEnd = TestBed.get(MockBackend);
//   });

//   it('should checkpin return true for pinned collection' , () => {

//     const mockResponse = {
//       data: [
//         { id: '1234', response: true },
//         { id: '2345', response: false }
//       ]
//     };


//      localStorage.setItem('currentUser', 'test1');
//      service.checkPinned(mockCollection).subscribe(
//        data => {
//          expect(data).toBe(true);
//        }
//      );

//   });


// });

