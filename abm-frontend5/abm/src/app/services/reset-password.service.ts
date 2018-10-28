import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
 
export class ResetPasswordService {

  constructor(private http:HttpClient) { }

  private handleError(error: any) {

    console.error('post error : ', error);
    return error.status;


}

  resetPassword(model): Observable<any> {
    console.log(model)
    const body = JSON.stringify(model);
    const headers = new Headers({ 'Content-type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/rest/approvePassword', body)
}
}
