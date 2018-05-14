import { Component, OnInit } from '@angular/core';
import { Logout } from '../services/logout.service';
import { Global } from '../services/global.service';
import { Router } from '@angular/router';
@Component({
  selector: 'abm-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logout: Logout, private global: Global, private router: Router) {
    this.onLogout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }
  onLogout() {
    this.global.loggedIn = false;
    this.logout.logout();
  }

}
