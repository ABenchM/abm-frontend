import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { Http } from '@angular/http';
import { CollectionService } from '../services/collection.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  hasCollections = false;
  userCollections: any[] = [];
  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute) {
  }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  open(row) {
    if (row.privateStatus) {
      this.router.navigateByUrl('/editCollection/' + row.id);
    } else {
      this.router.navigateByUrl('/view/' + row.id);
    }

  }
  ngOnInit() {

    if (localStorage.getItem('currentUser') != null) {

      this.service.getCollections(localStorage.getItem('currentUser')).subscribe(response => {
        this.userCollections = response.json();
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

}
