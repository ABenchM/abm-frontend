import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'abm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewMode;

  pageTitle = 'Automated Benchmark Management';

  constructor(private router: Router) {
    localStorage.setItem('viewMode', 'collection');
    this.viewMode = localStorage.getItem('viewMode');
  }
  // Use local storage

  loggedInStatus() {
    this.viewMode = localStorage.getItem('viewMode');
    return localStorage.getItem('loggedIn') === 'true';

  }

  onCLickViewMode(mode) {
    localStorage.setItem('viewMode', mode);
    this.viewMode = localStorage.getItem('viewMode');
  }

  sendMeHome() {
    this.router.navigate(['']);
    localStorage.setItem('viewMode', 'collection');
    this.viewMode = localStorage.getItem('viewMode');
  }
}
