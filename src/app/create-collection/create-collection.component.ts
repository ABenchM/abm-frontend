import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { UsernameValidators } from '../register/username.validators';
import { DataServiceService } from '../services/data-service.service';
import { CollectionService } from '../services/collection.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CommitService } from '../services/commit.service';

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
  // commit: any = {};
  // commits: any = [{}];
  constructor(private toastr: ToastrService,
    private collectService: CollectionService, private router: Router, private commitService: CommitService) {
    this.repositoryList = this.collectService.toCreate;
  }


  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  ngOnInit() {
  //   for (let i = 0; i < this.repositoryList.length; i++) {
  //  this.commits[i] = {};
  //     this.commitService.getCommits(this.repositoryList[i], 1).subscribe(
  //       res => {
  //         if (res.status === 200) {
  //           this.commits[i].commitId = res.json()[0].commitId;
  //           this.commits[i].id = this.repositoryList[i].id;
  //         }
  //       }
  //     );
  //   }

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
      privateStatus: true
    };

    this.project = {
      project_id: 'test_project',
      version_id: this.version.id,
      source: 'Maven'      
    };

    this.collection.versions = [];
    
    this.version.projects = [];

    // if (this.repositoryList.length === 0) {
    //   // To-DO NgCart feature
    // }

    // this.version.commits = [];
    // for (let i = 0; i < this.repositoryList.length; i++) {

    //   if (this.repositoryList[i].id === this.projects[i].id) {
    //     this.project = {
    //       project_id: this.projects[i].project_id
    //     };
    //   }

    //   this.commit.repository = this.repositoryList[i];
    //   this.commit.branchId = this.commit.repository.defaultBranch;
    
    this.version.projects.push(this.project);
    this.collection.versions.push(this.version);
// }
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
