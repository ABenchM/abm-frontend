import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import {Http } from '@angular/http';

@Injectable()
export class CurrentUserService {
  userOb: BehaviorSubject<string>;
  constructor(private http: Http) {
    this.userOb = new BehaviorSubject(localStorage.getItem('currentUser'));
  }

  username(name: string) {
    localStorage.setItem('currentUser', name);
    this.userOb.observers.forEach(o => {
      o.next(localStorage.getItem('currentUser'));
    });
  }

  userrole(role: string) {
    localStorage.setItem('currentUserRole', role);
  }

  getuserrole(username: string){
    const data = { 'username': username };
    return this.http.get('/rest/username', { params: data });
  }

  observable(): Observable<string> {

    return this.userOb.asObservable();
  }


}
