import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../models/search.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';




@Component({
  selector: 'abm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  model = new Search('');
  loading: boolean;
  results = [];
  language = {};
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
      this.results = response.json();
      this.loading = false;
    });

  }

  openSource(item) {

    // window.location.href = item.repositoryUrl;
    window.open(item.repositoryUrl, '_blank');

  }

  ngOnInit() {
  }

}
