import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  //logInStatus: boolean;
  constructor() {
     //this.logInStatus =  util.loggedInStatus();
   }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }
  ngOnInit() {
  }

}
