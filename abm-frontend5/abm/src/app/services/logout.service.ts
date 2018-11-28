
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Credentials } from '../models/credentials.model';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Router } from '@angular/router';

@Injectable()
export class Logout {
    constructor(private http: Http) {

    }

    private onSuccess(res: Response) {
        const statusCode = res.status;
       return statusCode;
    }

    private handleError(error: any) {

        console.error('post error : ', error);
        return observableThrowError(error.statusText);

    }
    private getBearerToken() {
console.log(document.cookie);
    }
    logout(): Observable<any> {
      //  this.getBearerToken();
      console.log("logout called");
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.get('/rest/logout', options).pipe(
            map(this.onSuccess),
            catchError(this.handleError), );
    }
}
