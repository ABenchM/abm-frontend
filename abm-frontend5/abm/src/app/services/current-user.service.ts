import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrentUserService {
  userOb: BehaviorSubject<string>;
  constructor() {
    this.userOb = new BehaviorSubject(localStorage.getItem('currentUser'));
  }

  username(name: string) {
    localStorage.setItem('currentUser', name);
    this.userOb.observers.forEach(o => {
      o.next(localStorage.getItem('currentUser'));
    });
  }
  observable(): Observable<string> {

    return this.userOb.asObservable();
  }


}
