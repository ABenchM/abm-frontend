import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'abm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Automated Benchmark Management';

  constructor(private router: Router) {

  }
  // Use local storage

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  sendMeHome(){
    this.router.navigate(['']);
  }   

}
