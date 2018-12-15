import { Component, OnInit } from '@angular/core';
import { Login } from '../services/login.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';
@Component({
  selector: 'abm-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor(private login: Login, private currentUserService: CurrentUserService) { }

  username: string;

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }
  currentUser(): Observable<string> {

    const userOb = new BehaviorSubject(localStorage.getItem('currentUser'));
    return userOb.asObservable();
  }

  ngOnInit() {
    // this.currentUser().subscribe(a => {
    //   this.username = a;
    // });
    this.currentUserService.observable().subscribe(s =>
      this.username = s

    );

  }


}
