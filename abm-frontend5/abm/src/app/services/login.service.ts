import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Credentials } from '../models/credentials.model';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Injectable()
export class Login {
    constructor(private http: Http ) {

    }

    private onSuccess(res: Response) {
        const statusCode = res.status;
       return statusCode;
    }

    private handleError(error: any) {

        console.error('post error : ', error);
        return error.status;


    }
    postLoginForm(credentials: Credentials): Observable<any> {
        const body = JSON.stringify(credentials);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post('/auth/login', body, options)
            .map(this.onSuccess)
            .catch(this.handleError);
    }
}
