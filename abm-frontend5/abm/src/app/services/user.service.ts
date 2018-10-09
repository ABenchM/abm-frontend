import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  getAllUsers() {
    const data = { 'isPending': 0 };
    return this.http.get('/rest/usersList', { params: data });
    // .subscribe(
    // response => { console.log(response.json());
    // });
  }
}
