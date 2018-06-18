import {Injectable} from '@angular/core';
import {Http , Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/user.model';
import { IfObservable } from 'rxjs/observable/IfObservable';
import {Observable} from 'rxjs/Rx';
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
            return body.fields || { };
        }


    }
    get checkUsername() {
        return Register.invalidUsername;
    }
    private handleError(error: any) {

        console.error('post error : ', error );
        return Observable.throw(error.statusText);


    }
     postRegisterForm(user: User): Observable<any> {
         const body = JSON.stringify(user);
         const headers = new Headers({'Content-type': 'application/json'});
         const options = new RequestOptions({headers: headers});
         return this.http.post('/rest/username', body, options)
         .map(this.extractData)
         .catch(this.handleError);
     }
}
