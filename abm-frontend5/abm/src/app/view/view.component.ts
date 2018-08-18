
import {take} from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { CollectionService } from '../services/collection.service';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ToastrService} from 'ngx-toastr';
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
  commits = [{}];
  derivedVersion: any = {};
  id;
  loading: boolean;
  selectProject: boolean;
  disabled: boolean;
  saving: boolean;
  downloading: boolean;
  hermesResultsExists: boolean;
  buildResultsExists: boolean;

  constructor(private service: CollectionService, private router: Router,
    private route: ActivatedRoute, private viewService: ViewService,
    private dataService: DataServiceService,
    private pinService: PinService, private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef, private location: Location) {

    this.id = this.route.snapshot.paramMap.get('id');
    // this.toastr.setRootViewContainerRef(viewContainerRef);
    this.loadViewCollection(this.id);

  }

  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  selectall() {

    for (let i = 0; i < this.version.commits.length; i++) {
      this.version.commits[i].selectProject = true;

    }

  }
  deselectall() {

    for (let i = 0; i < this.version.commits.length; i++) {
      this.version.commits[i].selectProject = false;
    }

  }

  select(fargCommit) {

    for (let i = 0; i < this.version.commits.length; i++) {
      if (this.version.commits[i].id === fargCommit.id) {
        // this.version.commits[i].selectProject = !this.version.commits[i].selectProject;
        break;
      }

    }

  }

  deriveVersion(fargVersion) {
    this.disabled = true;
    this.service.postDeriveVersion(fargVersion).subscribe(
      response => {
        if (response.status === 200) {

          this.derivedVersion = response.json();
          this.versions.push(this.derivedVersion);
          this.version = this.derivedVersion;

        }
      }
    );
    this.disabled = false;
  }

  copy() {
    this.service.toCreate = [];
    for (let i = 0; i < this.version.commits.length; i++) {
      if (this.version.commits[i].selectProject === true) {
        this.service.toCreate.push(this.version.commits[i].repository);
      }

    }
    // this.dataService.repositoryList = this.toCreate;

    this.router.navigateByUrl('/createCollection');
  }


  // This function is to check if any project is selected on the page.if no, then deselect all button will be disabled.
  isRepoSelected() {
    if (!this.version.commits) {
      return false;
    }

    for (let i = 0; i < this.version.commits.length; i++) {
      if (this.version.commits[i].selectProject === true) {
        return true;

      }
    }
    return false;
  }

  loadViewCollection(viewCollectionId) {
    this.loading = true;
    if (viewCollectionId) {
      this.service.getViewCollection(viewCollectionId).pipe(take(1)).subscribe(
        response => {
          if (response.json() !== undefined) {
            this.viewCollection = response.json();
            this.versions = response.json()[0].versions;
            this.version = response.json()[0].versions[0];
            this.commits = response.json()[0].versions[0].commits;

            this.viewService.checkFileStatus(this.version.id, 'build').subscribe(s => this.buildResultsExists = s.json());
            this.viewService.checkFileStatus(this.version.id, 'hermes').subscribe(s => this.hermesResultsExists = s.json());
            if (this.loggedInStatus()) {
              this.pinService.checkPinned(this.viewCollection[0]).subscribe(
                data => {
                  this.viewCollection[0].pinned = data.json();

                }
              );

            }
          }
        }
      );
    }
    this.loading = false;
  }

  downloadBuild(id) {

    this.downloading = true;
    this.viewService.getBuildResult(id).subscribe(
      response => {
        const buildResult = response.json();
        if (buildResult.status === 'RUNNING') {
          this.toastr.error('Build is in process, try again later', 'Oops!');
        } else {

          location.href = '/download/' + buildResult.id;
        }
      }
    );
    this.downloading = false;
  }

  downloadHermes(id) {
    this.downloading = true;
    this.viewService.getHermesResult(id).subscribe(
      response => {
        if (response.status === 200) {
          const hermesResult = response.json();
          location.href = '/downloadHermes/' + hermesResult.id;
        }
      }
    );
    this.downloading = false;
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

  //  checkFile(id, type) {
  //  this.viewService.checkFileStatus(id, type).subscribe( response => {
  //    if (response.status === 200 ) {
  //        if (type === 'hermes') {
  //             this.hermesResultsExists =  response.json();
  //        } else {
  //            this.buildResultsExists =  response.json();
  //        }

  //       }});
  //   }

  back() {
    if (this.loggedInStatus()) {
      this.router.navigateByUrl('/collection');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {

  }

}
