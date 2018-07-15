import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../models/search.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { DataTableResource } from 'angular5-data-table';




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
  searchResults: DataTableResource<any>;
  itemsCount: number;
  singleSelection = undefined;
  constructor(private service: SearchService) {

  }

  loadStatus() {
    return this.loading;
  }

  search(searchQuery, language) {
    this.loading = true;
    this.results = [];
    console.log(this.loading);
    this.service.getSearchResults(searchQuery, language).subscribe(response => {
      // this.results = response.json();
      this.searchResults = new DataTableResource(response.json());
      this.searchResults.query({ offset: 0 }).then(items => this.results = items);
      this.searchResults.count().then(count => this.itemsCount = count);
      this.loading = false;
      this.searched = true;
    });

  }

  reloadTable(params) {
    if (!this.searchResults) {
      return false;
    }
    this.searchResults.query(params).then(items => this.results = items);
  }

 select(item) {
    this.singleSelection = item;
 }

 addSingle(item) {
   this.service.project = [];
   this.service.project.push(item);
 }
  openSource(item) {

    // window.location.href = item.repositoryUrl;
    window.open(item.repositoryUrl, '_blank');

  }

  ngOnInit() {
  }

}
