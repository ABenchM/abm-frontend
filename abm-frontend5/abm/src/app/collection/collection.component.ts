import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { Http } from '@angular/http';
import {CollectionService} from '../services/collection.service';

@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  public hasCollections: boolean;
  collections: any[];
  constructor(private service: CollectionService) {
         }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  ngOnInit() {
    console.log('Inside ngOnint' + sessionStorage.getItem('currentUser'));
    if (sessionStorage.getItem('currentUser') != null) {
      console.log('Inside ngOnint' + sessionStorage.getItem('currentUser'));
      this.service.getCollections(sessionStorage.getItem('currentUser')).subscribe(response => {
         this.collections = response.json();
         this.hasCollections =  true;
      });
    }

  }

}
