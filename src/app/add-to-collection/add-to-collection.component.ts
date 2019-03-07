import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import { Subscription } from 'rxjs';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService, Toast } from 'ngx-toastr';
import { CollectionComponent } from '../collection/collection.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommitService } from '../services/commit.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'abm-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.css']
})
export class AddToCollectionComponent implements OnInit, OnDestroy {


  userCollections: any[] = [];
  // subscription: Subscription;
  loading: boolean;
  collection: any = {};
  version: any = {};
  updatedVersion: any = {};
  // commits: any = [{}];
  projects: any = [{}];
  project: any = {};
  versions: any[] = [{}];

  constructor(private collectionService: CollectionService, private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef, private router: Router, private route: ActivatedRoute,
    private commitService: CommitService , private searchService: SearchService) {
    // this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  loadUserCollections() {
    this.loading = true;
    this.collectionService.getCollections(localStorage.getItem('currentUser')).subscribe(response => {
      if (response.status === 200) {
        this.userCollections = response.json();
        let j: any;
      for (j = 0; j < this.userCollections.length; j++) {
        // this.versions = this.userCollections[j].versions;
        // console.log('versions length ' + this.versions.length);
        let i = 0;
        while (i < this.userCollections[j].versions.length) {
          // console.log('Status and id ' + response.json()[0].versions[i].privateStatus + ' ' + response.json()[0].versions[i].id);
          if (this.userCollections[j].versions[i].privateStatus === false) {
            console.log('Deleting version ' + this.userCollections[j].versions[i].id);
            this.userCollections[j].versions.splice(i, 1);

          } else {
            i = i + 1;
          }
        }
        if (this.userCollections[j].versions.length <= 0) {
          this.userCollections.splice(j, 1);
        }
      }
        this.collection = this.userCollections[0];
        this.version = this.collection.versions[0];
      }
    }

    );
    this.loading = false;
  }

  editCollection(item) {
    this.collection = item;
    this.version = this.collection.versions[0];
  }
  addProjects(fargVersion) {
    this.loading = true;
    this.updatedVersion = this.version;
    console.log(this.updatedVersion);
    // this.project = {
    //   project_id: 'test_project_selected',
    //   version_id: this.version.id,
    //   source: 'Maven'
    // };
    this.projects = this.collectionService.toAdd;
    // this.projects.push(this.project);
    for (let i = 0; i < this.projects.length; i++) {
      console.log('debug-->  ' + this.projects[i].id);
      // const project: any = {};
      // if (this.collectionService.toAdd[i].id === this.projects[i].id) {
      //   project.id = this.projects[i].id;
      // }
      // if (this.collectionService.toAdd[i].id === this.projects[i].id) {
      //   console.log('check - '+this.projects[i].id);
      //   //project.id = this.projects[i].id;
      // }
      // project.project_id = this.projects[i].project_id;
      // project.version_id = fargVersion.id;
      // project.source = 'maven';
      // commit.repository = this.collectionService.toAdd[i];
      // commit.branchId = commit.repository.defaultBranch;
      fargVersion.projects.push(this.projects[i]);
      console.log(fargVersion);
    // for (let i = 0; i < this.searchService.project.length; i++) {
    //   console.log(this.searchService.project[i]);
    //   const commit: any = {};
    //   if (this.collectionService.toAdd[i].id === this.commits[i].id) {
    //     commit.commitId = this.commits[i].commitId;
    //   }


    //   commit.repository = this.collectionService.toAdd[i];
    //   commit.branchId = commit.repository.defaultBranch;
    //   this.updatedVersion.commits.push(commit);
    //   console.log(this.updatedVersion);

     }

    this.collectionService.updateVersion(fargVersion).subscribe(
      response => {
        if (response.status === 200) {
          if (response.json() !== null) {
            this.version = response.json();
            for (let i = 0; i < this.collection.versions.length; i++) {
              if (this.collection.versions[i].id === this.version.id) {
                this.collection.versions.splice(i, 1, this.version);
              }
            }
            this.router.navigateByUrl('/editCollection/' + this.collection.id);
          }

        } else {
          this.toastr.error('Internal error: the projects cannot be added. Please try again later.' +
            'If the error persists, please report it here: https://github.com/ABenchM/abm/issues', null, { timeOut: 100 });
        }
      }
    );

  }

  loadCommits() {
    // for (let i = 0; i < this.collectionService.toAdd.length; i++) {

    //   this.commitService.getCommits(this.collectionService.toAdd[i], 1).subscribe(
    //     res => {
    //       if (res.status === 200) {
    //         if (res.json()[0] !== null) {

    //           this.commits[i].commitId = res.json()[0].commitId;
    //           this.commits[i].id = this.collectionService.toAdd[i].id;
    //         }
    //       }
    //     }
    //   );
    // }
  }

  ngOnInit() {
    this.loadUserCollections();
    // this.loadCommits();
  }



  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
