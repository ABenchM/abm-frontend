import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import 'rxjs/add/operator/take';
import { CollectionService } from '../services/collection.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
  id;
  loading: boolean;
  disabled: boolean;
  saving: boolean;
  downloading: boolean;
  hermesResultsExists: boolean;
  buildResultsExists: boolean;

  constructor(private service: CollectionService, private router: Router,
    private route: ActivatedRoute, private viewService: ViewService,
    private dataService: DataServiceService,
    private pinService: PinService, private toastr: ToastsManager,
    private viewContainerRef: ViewContainerRef, private location: Location) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.toastr.setRootViewContainerRef(viewContainerRef);
    this.loadViewCollection(this.id);

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


          this.viewService.downloadBuild(buildResult.id).subscribe(
            data => {
              if (data.status === 200) {
                this.toastr.success('File download successfully');
              }
            }
          );
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
