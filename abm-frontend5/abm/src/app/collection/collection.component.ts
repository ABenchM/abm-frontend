import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { Http } from '@angular/http';

@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {


  constructor(private http: Http) {
         }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }
  ngOnInit() {
   // this.http.get('/rest/collection' + '?user=' + 'demo').subscribe(response => {
     // console.log(response.json());
   //});
  }

}
