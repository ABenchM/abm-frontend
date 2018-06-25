import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestMethod} from '@angular/http';


@Injectable()
export class PinService {

  constructor(private http: Http) { }

  deletePin(target) {
    const currentUser = localStorage.getItem('currentUser');
    const body = JSON.stringify(
      {'type': 'collection',
      'user': currentUser,
      'id': target.id});
    const options = new RequestOptions({body: body});
    return this.http.delete('/rest/pin/', options);
  }

  postPin(target) {

   const currentUser = localStorage.getItem('currentUser');
   const body = JSON.stringify(
    {'type': 'collection',
    'user': currentUser,
    'id': target.id}
   );

   const options = new RequestOptions({
    method: RequestMethod.Post,
    url: '/rest/pin/',
    body: body
    }
    );
   return this.http.post('/rest/pin/', body);
  }

  checkPinned(item) {
    console.log('item ' + item.id);
    const currentUser = localStorage.getItem('currentUser');
   return this.http.get('/rest/pin/' + currentUser + '/' + item.id);
  }

}
