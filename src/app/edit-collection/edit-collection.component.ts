import { take } from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef, OnDestroy, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { DialogService } from 'ng2-bootstrap-modal';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';

import { ModalHermesComponent } from '../modal-hermes/modal-hermes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommitSelectorComponent } from '../commit-selector/commit-selector.component';
import { ModalBuildViewerComponent } from '../modal-build-viewer/modal-build-viewer.component';

import { buildDriverProvider } from 'protractor/built/driverProviders';
import { CommitService } from '../services/commit.service';
import { DataServiceService } from '../services/data-service.service';
import { HermesService } from '../services/hermes.service';
import { HermesViewerComponent } from '../hermes-viewer/hermes-viewer.component';
import { BuildService } from '../services/build.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogVersionDialogComponent } from './dialog-version-dialog.component';

@Component({
  selector: 'abm-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit, OnDestroy {

  collection: any = [{}];
  versions: any = [{}];
  version: any = {};
  latestVersion: any = {};
  buildprojects: any = {};
  projects = [{}];
  derivedVersion: any = {};

id;
  versionIndex;
  loading: boolean;
  saving: boolean;
  disabled: boolean;
  disableBuild: boolean;
  message = {};
  filtered: boolean;
  running: boolean;
  parentCollName;
  parentVersName;
  parentVersId;


  isOpen = false;
  buildstoRegister = [];
  findingStep = false;
  openingSocket = false;
  socket: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private dialog: MatDialog,
    private service: CollectionService, private dialogService: DialogService,
    private toastr: ToastrService, private viewf: ViewContainerRef,
    private modalService: NgbModal, private commitService: CommitService,
    private dataService: DataServiceService, private hermesService: HermesService, private buildService: BuildService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.versionIndex = this.route.snapshot.paramMap.get('versionIndex');
    if (this.versionIndex != null) {
      this.versionIndex--;
    }
    localStorage.setItem('id', this.id);
    // this.toastr.setRootViewContainerRef(viewf);

    // this.messageService.messages.subscribe(msg => {
    //   console.log('Response from server: ' + msg);
    // });
  }

  loadCollection(collectionId) {
    this.loading = true;
    if (collectionId) {
      this.service.getCollectionById(collectionId).pipe(take(1)).subscribe(response => {
        this.collection = response.json();
        this.versions = response.json()[0].versions;
        this.version = response.json()[0].versions[0];
        this.loadParentVersion(this.version.derivedFrom);
        if (this.versionIndex === null) {
          this.version = response.json()[0].versions[0];
        } else {
          this.version = response.json()[0].versions[this.versionIndex];
        }
        this.latestVersion = response.json()[0].versions[this.versions.length - 1];
        this.projects = response.json()[0].versions[0].projects;
        for (let i = 0; i < this.version.projects.length; i++) {
          this.version.projects[i].selectProject = true;
        }
        // console.log(response.json()[0].versions[0].number);
        // console.log(this.version.number);
      }
      );
    }
    this.loading = false;
  }

  loadParentVersion(parentId) {
    this.service.getVersionParentDetails(parentId).pipe(take(1)).subscribe(response => {
      if (response.arrayBuffer().byteLength > 0) {
        this.parentCollName = response.json().name;
        this.parentVersName = response.json().versions[0].name;
        this.parentVersId = parentId;
      }
    }
    );
  }

  selectVersion(fargVersion) {
    this.version = fargVersion;
    this.latestVersion = fargVersion;
    // for (let i = 0; i < this.version.projects.length; i++) {
    //   this.version.projects[i].selectProject = true;
    console.log(fargVersion);
    for (let i = 0; i < this.version.projects.length; i++) {
      this.version.projects[i].selectProject = true;
    }
    this.loadParentVersion(fargVersion.derivedFrom);

  }
  openDialog(ver): void {
    const dialogRef = this.dialog.open(DialogVersionDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        ver.name = result;
        ver.derivedFrom = this.versions[this.versions.length - 1].id;
        console.log(ver.derivedFrom);
        this.deriveVersion(ver);
        console.log('The dialog was closed:', result);
      }

    });



  }

  deriveVersion(ver) {

    console.log(ver);
    this.disabled = true;
    this.service.postDeriveVersion(ver).subscribe(
      response => {
        if (response.status === 200) {

          this.derivedVersion = response.json();
          this.versions.push(this.derivedVersion);
          this.version = this.derivedVersion;
          this.latestVersion = this.derivedVersion;
          this.loadParentVersion(this.version.derivedFrom);

        }
      }
    );
    this.disabled = false;
  }


  showConfirm(fargCollection) {
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Are you sure that you want to make current selected version public? This cannot be undone.'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {

          this.version.privateStatus = false;

          this.service.updateCollection(fargCollection).subscribe(
            response => {
              if (response.status === 200) {
                this.service.updateVersion(this.version).subscribe(data => {
                  if (data.status === 200) {
                    this.router.navigateByUrl('/collection');
                  }
                });

              }
            });
        } else {
          // alert('declined');
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);

  }

  removeCollection(collectionId) {
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Removal is irreversible! Continue?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.service.deleteCollection(collectionId).subscribe(
            response => {
              if (response.status === 200) {

                const d: any = this.collection;
                for (let i = 0; i < d.length; i++) {
                  if (d[i].id === collectionId) {
                    d.splice(i, 1);

                    break;
                  }
                }

              }

            }
          );

          this.router.navigate(['/collection']).then(
            () => {

              const toast = this.toastr.success('Your collection has been successfully deleted!!!', 'Sucess', { timeOut: 1000 });
            });

          setTimeout(() => {
            this.toastr.clear();
          }, 1000);
          setTimeout(() => {
            disposable.unsubscribe();
            this.toastr.clear();
          }, 10000);
        }
      });
  }
  removeVersion(versionId) {
    this.saving = true;
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Removal is irreversible! Continue?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.service.deleteVersion(versionId).subscribe(
            response => {
              const d: any = this.versions;
              for (let i = 0; i < d.length; i++) {
                if (d[i].id === versionId) {
                  d.splice(i, 1);
                  this.version = this.versions[0];
                  this.router.navigateByUrl('/editCollection/' + this.version.collection_id);
                  break;
                }
              }
            }
          );
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
    this.saving = false;
  }
  
  findTab(item) {
    return (item.id === this.id);
  }

  

  addProject(version) {
    this.service.toAddVersion = version;
    this.router.navigateByUrl('/search');

  }

  deleteProject(fargProject) {
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Removal is irreversible! Continue?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.commitService.deleteRepos(fargProject.id).subscribe(
            response => {
              if (response.status === 200) {
                const d: any = this.version.projects;
                for (let i = 0; i < d.length; i++) {
                  if (d[i].id === fargProject.id) {
                    d.splice(i, 1);
                    // this.router.navigateByUrl('/editCollection/' + this.version.collection_id);
                    break;
                  }
                }
              }
            }
          );
        }
      }

      );
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }

  update(fargCollection) {
    this.saving = true;
    console.log(fargCollection);
    this.service.updateCollection(fargCollection).subscribe(
      response => {
        if (response.status === 200) {
          this.toastr.success('Changes saved successfully');
          this.router.navigateByUrl('/editCollection/' + fargCollection.id);
        }
      }
    );
    this.saving = false;
  }


  back() {
    this.router.navigateByUrl('/collection');
  }


  ngOnInit() {

    this.dataService.cast.subscribe(response => this.running = response);
    if (!this.id) {
      this.id = localStorage.getItem('id');
    }
    this.loadCollection(this.id);
  }

  ngOnDestroy() {
    localStorage.removeItem('id');
  }

  isPublic() {
    for (let i = 0; i < this.versions.length; i++) {
      if (this.versions[i].privateStatus === 0) {
        return true;
      }
    }
    return false;
  }

  goToParent(){
    this.router.navigateByUrl('/parentview/' + this.parentVersId);
  }

}





