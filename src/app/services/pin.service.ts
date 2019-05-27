import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestMethod} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';


@Injectable()
export class PinService {

  constructor(private http: Http, private httpclient: HttpClient) { }

  private extractData(res: Response) {
  }

  handleError(error: any) {
    console.error('post error : ', error );
    return observableThrowError(error.statusText);
}

  deletePin(target): Observable<any> {
    const currentUser = localStorage.getItem('currentUser');
    const body = JSON.stringify(
      {'type': 'collection',
      'user': currentUser,
      'id': target.id});
    const options = new RequestOptions({body: body});
    return this.http.delete('/rest/pin/', options).pipe(
      catchError(this.handleError));
  }

  postPin(target): Observable<any> {

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
   return this.http.post('/rest/pin/', body).pipe(
    catchError(this.handleError));
  }

  checkPinned(item) {
       const currentUser = localStorage.getItem('currentUser');
      return this.http.get('/rest/pin/' + currentUser + '/' + item.id);

  }

}

