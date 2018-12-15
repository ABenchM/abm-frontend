import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';

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
