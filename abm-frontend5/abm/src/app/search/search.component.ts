import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../models/search.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'abm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor() {
    localStorage.setItem('loading', 'false');
     }

   loadingStatus() {
    return localStorage.getItem('loading') === 'true';
  }
  ngOnInit() {
  }

}
