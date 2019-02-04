
import { throwError as observableThrowError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user.model';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Observable';
@Injectable()
export class Register {
    static invalidUsername: boolean;
    constructor(private http: Http) {
        Register.invalidUsername = false;
    }

    private extractData(res: Response) {
        const body = res.json();
        if (body === false) {
            Register.invalidUsername = true;
            return body;
        } else {
            Register.invalidUsername = false;
            return body.fields || {};
        }


    }
    get checkUsername() {
        return Register.invalidUsername;
    }
    private handleError(error: any) {

        console.error('post error : ', error);
        return observableThrowError(error.statusText);


    }
    postRegisterForm(user: User): Observable<any> {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post('/rest/username', body, options).pipe(
            map(this.extractData),
            catchError(this.handleError));




    }

    checkPassword(password) {
        const data = {
            username: localStorage.getItem('currentUser'),
            password: password
        };
        return this.http.get('/rest/ispasswordmatched/', { params: data });
    }


    updateUser(user: User) {
        const body = JSON.stringify(user);
        console.log(user.password);
        const headers = new Headers({ 'Content-type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.put('/rest/username/', body, options);
    }

    deleteUser(currentUser) {
        const data = { username: currentUser };
        return this.http.delete('/rest/username/' + currentUser);
    }
// restAPi method to get the user details
    getUserDetails(currentUser) {
        const data = { username: currentUser };
        return this.http.get('/rest/username/', { params: data });
    }
}

