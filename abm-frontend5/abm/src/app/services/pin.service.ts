import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';


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

  checkPinned(item) {
    const currentUser = localStorage.getItem('currentUser');
   return this.http.get('/rest/pin/' + currentUser + '/' + item.id);
  }

}
