import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { CollectionService } from '../services/collection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {OrderPipe} from 'ngx-order-pipe';

@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, OnDestroy  {

  hasCollections = false;
  SortType: any = 'name';
  filterType: any = 'name';
  reverse = false;
  userCollections: any[] = [];
  filteredCollections: any[];
  // subscription: Subscription;
  constructor(private service: CollectionService, private router: Router,
    private route: ActivatedRoute , private orderPipe: OrderPipe) {

  }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }


  setSortType(value) {
    if (this.SortType === value) {
      this.reverse = !this.reverse;
    }
    this.SortType = value;
  }
  open(row) {
    if (row.privateStatus) {
      this.router.navigateByUrl('/editCollection/' + row.id);
    } else {
      this.router.navigateByUrl('/view/' + row.id);
    }

  }

  setFilterType(item) {
    this.filterType = item;
  }

 filter(query) {
   if (this.filterType === 'name') {
    this.filteredCollections = (query) ?
    this.userCollections.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : this.userCollections;
   } else if (this.filterType === 'description') {
    this.filteredCollections = (query) ?
    this.userCollections.filter(p => p.description.toLowerCase().includes(query.toLowerCase())) : this.userCollections;
   } else if (this.filterType === 'builtStatus') {

    if (query.toLowerCase().includes('n') ) {
        this.filteredCollections =  this.userCollections.filter(p => p.builtStatus === false);
    } else {
       this.filteredCollections = this.userCollections.filter(p => p.builtStatus === true);
    }

   } else if ( this.filterType === 'privateStatus') {

    if (query.toLowerCase().includes('pr') ) {
      this.filteredCollections =  this.userCollections.filter(p => p.privateStatus === true);
  } else {
     this.filteredCollections = this.userCollections.filter(p => p.privateStatus === false);
  }

   }


 }
  ngOnInit() {

    if (localStorage.getItem('currentUser') != null) {

      this.service.getCollections(localStorage.getItem('currentUser')).subscribe(response => {
        this.userCollections = this.filteredCollections = this.orderPipe.transform(response.json(), this.SortType);
          for (let i = 0; i < this.userCollections.length; i++) {
          for (let j = 0; j < this.userCollections[i].versions.length; j++) {
            if (this.userCollections[i].versions[j].frozen === true) {
              this.userCollections[i].builtStatus = true;
              break;
            }
          }
          if (this.userCollections[i].builtStatus === undefined) {
            this.userCollections[i].builtStatus = false;
          }
        }
        this.hasCollections = true;
      });
    }

  }

  ngOnDestroy() {
    //  this.subscription.unsubscribe();
  }

}
