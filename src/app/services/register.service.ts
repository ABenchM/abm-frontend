
import { throwError , Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient , HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CollectionTrackerError } from '../collectionTrackerError';


@Injectable()
export class Register {
    static invalidUsername: boolean;
    static emailExists: boolean;

    constructor(private httpclient: HttpClient) {
        Register.invalidUsername = false;
        Register.emailExists = false;
    }


    get checkUsername() {
        return Register.invalidUsername;
    }

    get checkEmail() {
        return Register.emailExists;
    }


    postRegisterForm(user: User): Observable<void | CollectionTrackerError> {
       // const body = JSON.stringify(user);
        const httpOptions = { headers : new HttpHeaders({ 'Content-type': 'application/json' }) };
        // const options = new RequestOptions({ headers: headers });
        return this.httpclient.post<String>('/rest/username', user, httpOptions).pipe(
            map(b =>  this.extractData(b)),
            catchError(err => this.handleError(err)));




    }

    private extractData(res: String) {

        const body: String = res;
        if (body.indexOf('username exists') > -1) {
            Register.invalidUsername = true;
        } else if (body.indexOf('email exists') > -1) {
            Register.emailExists = true;
            // return body.fields || {};
        }


    }

    checkPassword(password): Observable<Boolean | CollectionTrackerError> {
        const data = {
            username: localStorage.getItem('currentUser'),
            password: password
        };
        return this.httpclient.get<Boolean>('/rest/ispasswordmatched/', { params: data })
        .pipe(
            catchError(err => this.handleError(err))
        );
    }


    updateUser(user: User): Observable<Boolean | CollectionTrackerError> {
        const body = JSON.stringify(user);
        const httpOptions = { headers : new HttpHeaders({ 'Content-type': 'application/json' }) };
         return this.httpclient.put<Boolean>('/rest/username/', user, httpOptions)
         .pipe(
             catchError(err => this.handleError(err))
         );
    }

    deleteUser(currentUser): Observable<void | CollectionTrackerError> {

        return this.httpclient.delete<void>(`/rest/username/${currentUser}`)
        .pipe(
            catchError( err => this.handleError(err))
        );
    }

    // restAPi method to get the user details

    getUserDetails(currentUser): Observable<User | CollectionTrackerError>  {

        const data = {'username': currentUser};
         return this.httpclient.get<User>('/rest/username/', {params: data})
          .pipe(
              catchError( err => this.handleError(err))
            );
    }


    private handleError(error: HttpErrorResponse): Observable <CollectionTrackerError> {
        let dataError = new CollectionTrackerError();
        if (error.status === 403) {
        dataError.errorNumber = 403;
        dataError.message = error.statusText;
        dataError.userfriendlyMessage = 'Your session has expried. Please login first ';

    }
    return throwError(dataError);
}

}
