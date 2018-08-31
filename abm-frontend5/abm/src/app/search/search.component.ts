import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../models/search.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { CollectionService } from '../services/collection.service';
import { OrderPipe } from 'ngx-order-pipe';




@Component({
  selector: 'abm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  model = new Search('');
  loading: boolean;
  results = [];
  toAdd = [];
  language = {};
  searched = false;
  isSelect ;
  SortType: any = 'name';
  reverse = false;
  searchColumns: any[];

  constructor(private service: SearchService, private collectionService: CollectionService, private router: Router,
    private route: ActivatedRoute, private orderPipe: OrderPipe) {

  }



  setSortType(value) {
    if (this.SortType === value) {
      this.reverse = !this.reverse;
    }
    this.SortType = value;
  }

  addAll() {
    this.collectionService.toAdd = [];
    this.collectionService.toAdd = this.toAdd;
    this.router.navigateByUrl('/addToCollection');
  }


  createCollection() {
    this.collectionService.toCreate = [];
    this.collectionService.toCreate = this.toAdd;
    this.router.navigateByUrl('/createCollection');
  }



  loadStatus() {
    return this.loading;
  }

  search(searchQuery, language) {
    this.loading = true;
    this.results = [];

    this.service.getSearchResults(searchQuery, language).subscribe(response => {
      this.results = response.json();
      for (let i = 0; i < this.results.length; i++) {
        this.results[i].singleSelection = false;
      }
      // this.searchResults.query({ offset: 0 }).then(items => this.results = items);
      // this.searchResults.count().then(count => this.itemsCount = count);
      this.loading = false;
      this.searched = true;
    });

  }



  isProjectSelected() {
    if (!this.results) {
      return false;
    }

    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].singleSelection === true) {
        return true;

      }
    }
    return false;
  }

  // deselectAll() {
  //   for (let i = 0; i < this.results.length; i++) {
  //     this.results[i].singleSelection = false;
  //     this.service.project = [];
  //     this.toAdd = [];
  //   }
  // }

  removeCart() {
    this.toAdd = [];
    this.isSelect = !this.isSelect;
  }

  removeItem(itemId) {
    for (let i = 0; i < this.toAdd.length; i++) {
      if (this.toAdd[i].id === itemId) {
        this.toAdd.splice(i, 1);
      }
    }
  }

  // selectAll() {
  //   for (let i = 0; i < this.results.length; i++) {
  //     this.results[i].singleSelection = true;
  //     this.service.project.push(this.results[i]);

  //   }
  //   this.toAdd = this.service.project;
  // }

  selectDeselectAll() {

    this.isSelect = !this.isSelect;
    console.log('isSelect ' + this.isSelect);
    if (this.isSelect === true) {
      for (let i = 0; i < this.results.length; i++) {
        this.results[i].singleSelection = true;
        this.service.project.push(this.results[i]);

      }
      this.toAdd = this.service.project;
    } else {
      for (let i = 0; i < this.results.length; i++) {
        this.results[i].singleSelection = false;
        this.service.project = [];
        this.toAdd = [];
      }
    }


  }

  select(item) {

    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].id === item.id) {

        if (this.results[i].singleSelection === true) {

          this.service.project.push(item);
          this.toAdd.push(item);
        } else {
          console.log('Value of item ' + item);
          this.service.project.splice(i, 1);
          console.log(this.toAdd.length);
          this.toAdd.splice(i, 1);
          console.log(this.toAdd.length);
        }

        break;
      }
    }
  }

  getTotalItems() {

    return this.toAdd.length;
  }

  openSource(item) {

    // window.location.href = item.repositoryUrl;
    window.open(item.repositoryUrl, '_blank');

  }

  ngOnInit() {
    this.searchColumns =  [
      { field: 'name', header: 'Name' },
  { field: 'description', header: 'Description' },
  { field: 'creationdate', header: 'Creation Date' },
  { field: 'size', header: 'Size' },
  { field: 'htmlUrl', header: 'Origin' }
];
    this.toAdd = [];
    this.results = [];
  }

}
