import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../services/collection.service';

@Component({
  selector: 'abm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public hasCollections: boolean;
  collections: any[];
  constructor(private service: CollectionService) { }

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

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

}
