import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CollectionTrackerError } from '../collectionTrackerError';



@Injectable()
export class PinService {

  constructor(private httpclient: HttpClient) { }

  private extractData(res: Response) {
  }



  deletePin(target): Observable<void | CollectionTrackerError> {
    const currentUser = localStorage.getItem('currentUser');

    const type = 'collection';

    return this.httpclient.delete<void>(`/rest/pin/${type}/${currentUser}/${target.id}`).pipe(
  catchError(err => this.handleError(err)));
  }

postPin(target): Observable < any > {

  const currentUser = localStorage.getItem('currentUser');
  return this.httpclient.post('/rest/pin/', JSON.stringify(
    {
      'type': 'collection',
      'user': currentUser,
      'id': target.id
    }
  )).pipe(
    catchError(err => this.handleError(err)));
}

checkPinned(item): Observable < Boolean | CollectionTrackerError > {
  const currentUser = localStorage.getItem('currentUser');
  return this.httpclient.get<Boolean>(`/rest/pin/${currentUser}/${item.id}`)
    .pipe(
      catchError(err => this.handleError(err))
    );

}

  private handleError(error: HttpErrorResponse): Observable < CollectionTrackerError > {
  let dataError = new CollectionTrackerError();
  if (error.status === 403) {
  dataError.errorNumber = 403;
  dataError.message = error.statusText;
  dataError.userfriendlyMessage = 'Your session has expried. Please login first ';
}

return throwError(dataError);
  }

}

