import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { UsernameValidators } from '../register/username.validators';
import { CollectionService } from '../services/collection.service';
import { Router, ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'abm-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {


  loading: boolean;
  collection: any = {};
  repositoryList: any[];
  projects: any = [{}];
  project: any = {};
  version: any = {};
  parentVersion: any;
  // commit: any = {};
  // commits: any = [{}];
  constructor(private toastr: ToastrService,
    private collectService: CollectionService, private router: Router) {
    this.projects = this.collectService.toCreate;
    this.parentVersion = this.collectService.parentVersionId;
  }


  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  ngOnInit() {


  }

  save() {
    if (!this.loggedInStatus()) {
      this.toastr.error('Please login before creating a collection');
    }
    this.loading = true;
    this.collection.creation_date = new Date();
    this.collection.privateStatus = true;

    this.version = {
      number: 1,
      creationDate: new Date(),
      comment: 'Initial version',
      privateStatus: true,
      derivedFrom: this.parentVersion
    };
    this.collection.versions = [];
    this.collection.versions.push(this.version);
    this.collection.versions = [];
    this.version.projects = [];
    for (let i = 0; i < this.projects.length; i++) {
      this.project = {
        project_id: this.projects[i].project_id,
        source: this.projects[i].source
      };
      this.version.projects.push(this.project);
    }
    this.collection.versions.push(this.version);
    this.collectService.createCollection(this.collection).subscribe(response => {
      if (response.status === 200) {
        this.toastr.success('Collection successfully copied');
        this.router.navigateByUrl('/collection');
      } else if (response.status === 403) {
        this.router.navigateByUrl('/login');
      } else {
        this.toastr.error('Internal error: the collections cannot be saved. Please try again later.' +
          'If the error persists, please report it here: https://github.com/ABenchM/abm/issues');
      }
    });
    this.loading = false;
    console.log(this.repositoryList);
  }

}
