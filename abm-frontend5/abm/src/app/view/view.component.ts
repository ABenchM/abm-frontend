import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import 'rxjs/add/operator/take';
import { CollectionService } from '../services/collection.service';

import { DataServiceService } from '../services/data-service.service';


@Component({
  selector: 'abm-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  viewCollection = [{}];
  versions = [{}];
  version: any = {};
  toCreate = [];
  commits = [{}];
  id;
  loading: boolean;
  disabled: boolean;
  saving: boolean;

  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute,
    private dataService: DataServiceService) {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  selectall() {

  }
  deselectall() {

  }

  copy() {
    this.toCreate = [];
    for (let i = 0; i < this.version.commits.length; i++) {
      this.toCreate.push(this.version.commits[i].repository);
    }
    this.dataService.repositoryList = this.toCreate;
    this.router.navigateByUrl('/createCollection');
  }

  loadViewCollection(viewCollectionId) {
    this.loading = true;
    if (viewCollectionId) {
      this.service.getViewCollection(viewCollectionId).take(1).subscribe(
        response => {
          this.viewCollection = response.json();
          this.versions = response.json()[0].versions;
          this.version = response.json()[0].versions[0];
          this.commits = response.json()[0].versions[0].commits;
        }
      );
    }

    this.loading = false;
  }


  back() {
    if (this.loggedInStatus()) {
      this.router.navigateByUrl('/collection');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.loadViewCollection(this.id);
  }

}
