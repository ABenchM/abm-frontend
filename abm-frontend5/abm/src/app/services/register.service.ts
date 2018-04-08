import {Injectable} from '@angular/core';
import {Http , Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../models/user.model';
import { IfObservable } from 'rxjs/observable/IfObservable';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class Register {
     constructor(private http: Http) {

     }

    private extractData(res: Response) {
        const body = res.json();
        return body.fields || { };

    }

    private handleError(error: any) {

        console.error('post error : ', error );
        return Observable.throw(error.statusText);


    }
     postRegisterForm(user: User): Observable<any> {
         const body = JSON.stringify(user);
         const headers = new Headers({'Content-type': 'application/json'});
         const options = new RequestOptions({headers: headers});
         return this.http.post('http://localhost:3100/postuser', body, options)
         .map(this.extractData)
         .catch(this.handleError);
      
     }
}
