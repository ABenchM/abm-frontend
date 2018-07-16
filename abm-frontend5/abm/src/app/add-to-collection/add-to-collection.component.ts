import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CollectionComponent } from '../collection/collection.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'abm-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.css']
})
export class AddToCollectionComponent implements OnInit, OnDestroy {


  userCollections: any[] = [];
  subscription: Subscription;
  loading: boolean;
  collection: any = {};
  version: any = {};
  updatedVersion: any = {};
  constructor(private collectionService: CollectionService, private toastr: ToastsManager,
    private viewContainerRef: ViewContainerRef, private router: Router, private route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  loadUserCollections() {
    this.loading = true;
    this.subscription = this.collectionService.getCollections(localStorage.getItem('currentUser')).subscribe(response => {
      if (response.status === 200) {
        this.userCollections = response.json();
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
    for (let i = 0; i < this.collectionService.toAdd.length; i++) {
      console.log(this.collectionService.toAdd[i]);
      const commit: any = {};
      commit.commitId = 'HEAD';

      commit.repository = this.collectionService.toAdd[i];
      commit.branchId = commit.repository.defaultBranch;
      this.updatedVersion.commits.push(commit);
      console.log(this.updatedVersion);

    }

    this.collectionService.updateVersion(fargVersion).subscribe(
      response => {
        if (response.status === 200) {
          this.version = response.json();
          for (let i = 0; i < this.collection.versions.length; i++) {
            if (this.collection.versions[i].id === this.version.id) {
              this.collection.versions.splice(i, 1, this.version);
            }
          }
          this.router.navigateByUrl('/editCollection/' + this.collection.id);
        } else {
          this.toastr.error('Internal error: the projects cannot be added. Please try again later.' +
            'If the error persists, please report it here: https://github.com/ABenchM/abm/issues', null, { toastLife: 100 });
        }
      }
    );

  }
  ngOnInit() {
    this.loadUserCollections();
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
