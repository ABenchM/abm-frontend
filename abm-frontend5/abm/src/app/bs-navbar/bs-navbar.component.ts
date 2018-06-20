import { Component, OnInit } from '@angular/core';
import {Login} from '../services/login.service';

@Component({
  selector: 'abm-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor(private login: Login) { }

  username: string;

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }
    ngOnInit() {
      this.username = localStorage.getItem('currentUser');
  }



}
