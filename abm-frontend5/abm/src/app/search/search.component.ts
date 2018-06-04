import { Component, OnInit } from '@angular/core';


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
