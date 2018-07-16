import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../models/search.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { DataTableResource } from 'angular5-data-table';
import { CollectionService } from '../services/collection.service';




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


  constructor(private service: SearchService , private collectionService: CollectionService, private router: Router,
  private route: ActivatedRoute) {

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

  deselectAll() {
    for (let i = 0; i < this.results.length; i++) {
      this.results[i].singleSelection = false;
      this.service.project = [];
      this.toAdd = [];
    }
  }

  removeCart() {
    this.toAdd = [];
  }

  removeItem(itemId) {
    for (let i = 0; i < this.toAdd.length; i++) {
      if (this.toAdd[i].id === itemId) {
        this.toAdd.splice(i, 1);
      }
    }
  }

  selectAll() {
    for (let i = 0; i < this.results.length; i++) {
      this.results[i].singleSelection = true;
      this.service.project.push(this.results[i]);

    }
    this.toAdd = this.service.project;
  }

  select(item) {

    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].id === item.id) {

        if (this.results[i].singleSelection === true) {
          console.log('Value of item ' + item);
          this.service.project.push(item);
          this.toAdd.push(item);
        } else {
          this.service.project.splice(i, 1);
          this.toAdd.splice(i, 1);
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
    this.toAdd = [];
    this.results = [];
  }

}
