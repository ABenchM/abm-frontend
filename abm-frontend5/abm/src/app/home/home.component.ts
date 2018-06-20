import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import {Search} from '../models/search.model';

@Component({
  selector: 'abm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pinned: any[];
  public publicCollections: any[];
  cancelSearch: boolean;
  loading: boolean;
  isPinned = false;
  isPublicData = false;
  constructor(private service: CollectionService) { }

  model = new Search('');

  loadPublicCollections() {
    this.loading = true;
    this.service.getPublicCollections().subscribe(response => {
      this.publicCollections = response.json();
    });
    this.loading = false;
  }

  loadPinned() {
    this.loading = true;
    this.service.getPinnedCollections().subscribe(response => {
     this.pinned = response.json();
     console.log(this.pinned);
    });

    this.loading = false;
  }

  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  loadUser() {
    const user: string = sessionStorage.getItem('currentUser');
    if (user === '') {
      return false;
    } else {
      return true;
    }
  }

  search(searchQuery) {
    console.log('searching .....' + searchQuery);
    let searching = true;
    this.cancelSearch = true;
    this.service.getSearchCollections(searchQuery).subscribe(
      response => {
        console.log('Service results ' + response.json());
        this.publicCollections = response.json();
      });
    searching = false;
  }

  cancel() {
    this.model.query = '';
    this.cancelSearch = false;
    this.loadPublicCollections();
  }


  unpin(row) {
    return null;

  }

  ngOnInit() {
    this.loadPublicCollections();
    if (this.loadUser() && this.loggedInStatus) {
       this.loadPinned();
    }
      }

}
