
import { take } from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource , MatCheckboxModule} from '@angular/material';
import { CollectionService } from '../services/collection.service';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../services/data-service.service';
import { PinService } from '../services/pin.service';
import { ViewService } from '../services/view.service';
import { Location } from '@angular/common';

@Component({
  selector: 'abm-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  viewCollection: any = [{}];
  versions: any[] = [{}];
  version: any = {};
  toCreate = [];
  projects = [{}];
  derivedVersion: any = {};
  id;
  versionIndex;
  loading: boolean;
  selectProject: boolean;
  disabled: boolean;
  saving: boolean;
  downloading: boolean;
  hermesResultsExists: boolean;
  buildResultsExists: boolean;
  parentCollName;
  parentVersName;
  parentVersId;
  displayedColumns: string[] = ['name', 'check'];
  results = [];
  publicVersionDataSource = new MatTableDataSource<any>(this.results);

  constructor(private service: CollectionService, private router: Router,
    private route: ActivatedRoute, private viewService: ViewService,
    private dataService: DataServiceService,
    private pinService: PinService, private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef, private location: Location) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.versionIndex = this.route.snapshot.paramMap.get('versionIndex');
    if (this.versionIndex != null) {
      this.versionIndex--;
    }
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.loadViewCollection(this.id);

  }

  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  selectall() {

    for (let i = 0; i < this.version.projects.length; i++) {
      this.version.projects[i].selectProject = true;

    }

  }
  deselectall() {

    for (let i = 0; i < this.version.projects.length; i++) {
      this.version.projects[i].selectProject = false;
    }

  }

  select(fargCommit) {

    for (let i = 0; i < this.version.projects.length; i++) {
      if (this.version.projects[i].id === fargCommit.id) {
        // this.version.projects[i].selectProject = !this.version.projects[i].selectProject;
        break;
      }

    }

  }

  copy() {
    this.service.toCreate = [];
    for (let i = 0; i < this.version.projects.length; i++) {
      if (this.version.projects[i].selectProject === true) {
        this.service.toCreate.push(this.version.projects[i]);
      }

    }
    this.service.parentVersionId = this.version.id;
    // this.dataService.repositoryList = this.toCreate;

    this.router.navigateByUrl('/createCollection');
  }


  // This function is to check if any project is selected on the page.if no, then deselect all button will be disabled.
  isRepoSelected() {
    if (!this.version.projects) {
      return false;
    }

    for (let i = 0; i < this.version.projects.length; i++) {
      if (this.version.projects[i].selectProject === true) {
        return true;

      }
    }
    return false;
  }

  loadParentVersion(parentId) {
    if(this.loggedInStatus()){
    this.service.getVersionParentDetails(parentId).pipe(take(1)).subscribe(response => {
      if (response.arrayBuffer().byteLength > 0) {
        this.parentCollName = response.json().name;
        this.parentVersName = response.json().versions[0].name;
        this.parentVersId = parentId;
      }
    }
    );
  }
  }

  selectVersion(fargVersion) {
    this.version = fargVersion;
    // for (let i = 0; i < this.version.projects.length; i++) {
    //   this.version.projects[i].selectProject = true;
    console.log(fargVersion);
    this.loadParentVersion(fargVersion.derivedFrom);
  }

  loadViewCollection(viewCollectionId) {
    this.loading = true;
    console.log(localStorage.getItem('currentUser'));
    if (viewCollectionId) {
      this.service.getViewCollection(viewCollectionId).pipe(take(1)).subscribe(
        response => {
          if (response.status === 200) {
            if (response.json() !== undefined) {
              this.viewCollection = response.json();
              this.versions = response.json()[0].versions;
              console.log('versions length ' + this.versions.length);
              let i = 0;
              while (i < this.versions.length) {
                console.log('Status and id ' + response.json()[0].versions[i].privateStatus + ' ' + response.json()[0].versions[i].id);
                if (this.versions[i].privateStatus === true) {
                  console.log('Deleting version ' + this.versions[i].id);
                  this.versions.splice(i, 1);

                } else {
                  i = i + 1;
                }
              }

              // this.version = response.json()[0].versions[0];
              if (this.versionIndex === null) {
                this.version = this.versions[0];
              } else {
                this.version = this.versions[this.versionIndex];
              }
              this.loadParentVersion(this.version.derivedFrom);
              console.log('versions' + this.versions.length);
              console.log('version' + this.version.id);
              // this.projects = response.json()[0].versions[0].projects;
              this.projects = this.versions[0].projects;

              this.viewService.checkFileStatus(this.version.id, 'build').subscribe(s => {
                if (s.status === 200) {
                  this.buildResultsExists = s.json();
                } else if (s.status === 403) {
                  this.toastr.error('Your session has expried. Please login first ');
                  this.router.navigateByUrl('/login');
                }

              });
              this.viewService.checkFileStatus(this.version.id, 'hermes').subscribe(s => {
                if (s.status === 200) {
                  this.hermesResultsExists = s.json();
                } else if (s.status === 403) {
                  this.toastr.error('Your session has expried. Please login first ');
                  this.router.navigateByUrl('/login');
                }
              });
              if (this.loggedInStatus()) {
                this.pinService.checkPinned(this.viewCollection[0]).subscribe(
                  data => {
                    if (data.status === 200) {
                      this.viewCollection[0].pinned = data.json();
                    } else if (data.status === 403) {
                      this.toastr.error('Your session has expried. Please login first ');
                      this.router.navigateByUrl('/login');
                    }


                  }
                );

              }
            }
          } else if (response.status === 403) {
            this.toastr.error('Your session has expried. Please login first ');
            this.router.navigateByUrl('/login');
          }

        }
      );
    }
    this.publicVersionDataSource.data = this.version.commits;
    this.loading = false;
  }


  pin() {
    this.disabled = true;
    this.pinService.postPin(this.viewCollection[0]).subscribe(
      response => {
        if (response.status === 200) {
          this.viewCollection[0].pinned = true;
        }
      }
    );
    this.disabled = false;
  }

  unpin() {
    this.disabled = true;
    this.pinService.deletePin(this.viewCollection[0]).subscribe(
      response => {
        if (response.status === 200) {
          this.viewCollection[0].pinned = false;
        }
      }
    );
    this.disabled = false;
  }


  back() {
      this.router.navigateByUrl('/');
  }

  ngOnInit() {

  }

  goToParent() {
    this.router.navigateByUrl('/parentview/' + this.parentVersId);
  }

}
