import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import {Http , Response, Headers, RequestOptions} from '@angular/http';
import { User} from '../models/user.model'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private httpClient: HttpClient) { }  

  private extractData(res: Response) {
    
  }

  private handleError(error: any) {

    console.error('post error : ', error );
    return observableThrowError(error.statusText);


}

  getAllUsers(aprv) {
    const data = { 'approved': aprv };
    return this.http.get('/rest/userList', { params: data });
  }
  
  deleteUsers(user: string): Observable<any>{
    const body = { 'deleteUsers': user };
   const headers = new Headers({'Content-type': 'application/json'});
   const options = new RequestOptions({headers: headers});
   return this.http.post('/rest/adminDeleteUsers', body, options).pipe(
   map(this.extractData),
   catchError(this.handleError));

}

  lockunlockUser(user: User, islock: boolean): Observable<any>{
    const body = { 'isLock': islock, 'username': user.username };
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('/rest/userlockunlock', body, options).pipe(
    map(this.extractData),
    catchError(this.handleError));
  }

  approveRejectUser(user: User, isApprove: boolean): Observable<any>{
    const body = { 'isApprove': isApprove, 'username': user.username };
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('/rest/approval', body, options).pipe(
    map(this.extractData),
    catchError(this.handleError));
  }
}