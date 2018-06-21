import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import {Search} from '../models/search.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'abm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pinned: any[];
  publicCollections = [];
  cancelSearch: boolean;
  loading: boolean;
  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute) { }

  model = new Search('');

  loadPublicCollections() {
    this.loading = true;
    // this.service.getPublicCollections();
     this.service.getPublicCollections().subscribe(response => {
       console.log('Response from public collections service  ' + response.json());
       this.publicCollections = response.json();
     });
     this.loading = false;
  }

  loadPinned() {
    this.loading = true;
    this.service.getPinnedCollections().subscribe(response => {
     this.pinned = response.json();
        });

    this.loading = false;
  }

  open(collection) {
    this.router.navigateByUrl('/view/' + collection.id);
  }
  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
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
    if (this.loggedInStatus()) {
       this.loadPinned();
    }
      }

}