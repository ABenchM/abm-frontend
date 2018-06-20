import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { Http } from '@angular/http';
import {CollectionService} from '../services/collection.service';
import {Cap}

@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  hasCollections = false;
  userCollections: any[];
  constructor(private service: CollectionService) {
         }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  ngOnInit() {
    console.log('Inside ngOnint' + localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser') != null) {
      console.log('Inside ngOnint' + localStorage.getItem('currentUser'));
      this.service.getCollections(localStorage.getItem('currentUser')).subscribe(response => {
         this.userCollections = response.json();
         console.log('Collection size ' + this.userCollections.length);
         this.hasCollections =  true;
      });
    }

  }

}
