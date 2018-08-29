
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Credentials } from '../models/credentials.model';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class Login {
    constructor(private http: Http) {

    }
    username: string;

    private onSuccess(res: Response, uname: string) {
        const statusCode = res.status;
        this.username = uname;
        return res;
    }

    private handleError(error: any) {

        console.error('post error : ', error);
        return error.status;


    }
    postLoginForm(credentials: Credentials): Observable<any> {
        const body = JSON.stringify(credentials);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post('/rest/login', body, options).pipe(
            map(f => this.onSuccess(f, credentials.username)),
            catchError(this.handleError), );
    }

    isLoggedin() {
        return localStorage.getItem('loggedIn');

    }

    get currentUser() {
        return this.username;
    }


}
