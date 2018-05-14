import { Component } from '@angular/core';
import {Global} from './services/global.service';
@Component({
  selector: 'abm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Automated Benchmark Management';

  constructor(private global: Global ) {

  }
  // Use local storage

  loggedInStatus() {
    return this.global.loggedIn;
  }

}
