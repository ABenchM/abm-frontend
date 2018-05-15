import { Component } from '@angular/core';
@Component({
  selector: 'abm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Automated Benchmark Management';

  constructor() {

  }
  // Use local storage

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

}
