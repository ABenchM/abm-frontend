import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from '../models/user.model'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private heroesUrl = 'rest/userlockunlock';

  constructor(private http: Http, private httpClient: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
  }

  getAllUsers() {
    const data = { 'approved': 1 };
    return this.http.get('/rest/userList', { params: data });
    // .subscribe(
    // response => { console.log(response.json());
    // });
  }

  deleteUser(user: User){
    const data = { 'deleteUsers': user.username };
    //const data1 = '}';
    return this.http.post('/rest/adminDeleteUsers', { params: data});
  }

  lockUser(user: User){
    const data = { 'isLock': true, 'username': user.username };
    //const data1 = '}';
    return this.http.get('/rest/userlockunlock', { params: data });
  }

  unlockUser(user: User){
    const data = { 'isLock': false, 'username': user.username };
    //const data1 = '}';
    return this.http.get('/rest/userlockunlock', { params: data });
  }

  // lockUser (collection: User | string): Observable<User> {
  //   const id = typeof collection === 'string' ? collection : collection.username;
  //   const url = `${this.heroesUrl}/${collection}/${"true"}`;

  //   return this.httpClient.delete<User>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<User>('deleteCollection'))
  //   );
  // }
}
