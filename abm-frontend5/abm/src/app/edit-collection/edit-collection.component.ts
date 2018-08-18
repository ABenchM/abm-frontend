
import {take} from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { DialogService } from 'ng2-bootstrap-modal';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../services/message.service';
import { WebsocketService } from '../services/websocket.service';
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

@Component({
  selector: 'abm-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit, OnDestroy {

  collection: any = [{}];
  versions: any = [{}];
  version: any = {};
  buildprojects: any = {};
  commits = [{}];
  derivedVersion: any = {};
  id;
  loading: boolean;
  saving: boolean;
  disabled: boolean;
  disableBuild: boolean;
  message = {};
  filtered: boolean;
  running: boolean;


  isOpen = false;
  buildstoRegister = [];
  findingStep = false;
  openingSocket = false;
  socket: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private service: CollectionService, private dialogService: DialogService,
    private toastr: ToastrService, private viewf: ViewContainerRef, private webSocketService: WebsocketService,
    private messageService: MessageService, private modalService: NgbModal, private commitService: CommitService,
    private dataService: DataServiceService, private hermesService: HermesService, private buildService: BuildService) {
    this.id = this.route.snapshot.paramMap.get('id');
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
        this.commits = response.json()[0].versions[0].commits;
        for (let i = 0; i < this.version.commits.length; i++) {
          this.version.commits[i].selectProject = true;
        }
        // console.log(response.json()[0].versions[0].number);
        // console.log(this.version.number);
      }
      );
    }
    this.loading = false;
  }

  selectCommit(fargCommit) {

    this.openCommitModal(fargCommit);
  }
  selectVersion(fargVersion) {
    this.version = fargVersion;
    for (let i = 0; i < this.version.commits.length; i++) {
      this.version.commits[i].selectProject = true;
    }
  }
  deriveVersion(ver) {
    this.disabled = true;
    this.service.postDeriveVersion(ver).subscribe(
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


  // unfreeze(fargversion) {
  //   this.disableBuild = true;
  //   this.service.getBuild(fargversion).subscribe(
  //    response => {
  //      const buildResult = response.json();
  //      if (buildResult.status === 'RUNNING' || buildResult.status === 'WAITING' ) {
  //             const repoId =  undefined;
  //             this.sendMsg({msg: 'listen', id: buildResult.id});
  //             console.log('sending command');
  //             this.sendMsg({msg: 'cancel', id: buildResult.id});
  //      } else {
  //          this.deleteBuild(fargversion);
  //      }
  //    }
  //    );
  //   this.disableBuild = false;
  // }

  deleteBuild(fargversion) {
    this.service.deleteBuild(fargversion).subscribe(response => {

      if (response.status === 200) {
        this.version = fargversion;
        this.version.frozen = false;
      }

    });
  }

  runFilter(fargversion) {

    this.service.getBuild(fargversion).subscribe(
      response => {
        if (response.status === 200) {
          const buildResult = response.json();
          if (buildResult.status === 'RUNNING') {
            this.toastr.error('Build is in progress, try again later');
          } else {
            this.version.filtered = true;
            this.dataService.setRunning(true);
            this.openHermesModal();
          }
        }
      }
    );

  }


  openHermesModal() {
    const modalRef = this.modalService.open(ModalHermesComponent, { size: 'lg' });
    modalRef.componentInstance.version = this.version;
    modalRef.componentInstance.collection = this.collection;


  }

  openCommitModal(commit) {
    const modalRef = this.modalService.open(CommitSelectorComponent, { size: 'lg' });
    modalRef.componentInstance.commit = commit;

  }


  // sendMsg(message) {
  //   console.log('Message from client: ', message);
  //   this.messageService.messages.next(message);
  // }

  showConfirm(fargCollection) {
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Are you sure?This cannot be undone.'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          fargCollection.privateStatus = false;
          this.service.updateCollection(fargCollection).subscribe(
            response => {
              if (response.status === 200) {
                this.router.navigateByUrl('/collection');
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

              const toast = this.toastr.success('Your collection has been successfully deleted!!!', 'Sucess', {timeOut: 1000});
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
  addBuild() {

    let targetTab = this.buildService.builds.findIndex(this.findTab, this.version);
    if (targetTab < 0) {
      this.buildService.builds.push({
        'id': this.version.id, 'name': this.collection[0].name,
        'versionNum': this.version.number, 'progress': 0, 'buildStatus': '', 'hidden': false
      });
      targetTab = this.buildService.builds.length - 1;
      this.getBuildProcess(this.version.id, targetTab);
    } else {
      this.buildService.builds[targetTab].hidden = false;

    }
    this.buildService.initialSelection = this.buildService.builds[targetTab];

    const modalRef = this.modalService.open(ModalBuildViewerComponent, { size: 'lg' });
    modalRef.componentInstance.showing = this.buildService.initialSelection;
    modalRef.componentInstance.tabs = this.buildService.builds;

  }

  getBuildProcess(id, targetTab) {
    this.buildService.getBuild(id).subscribe(
      res => {
        if (res.status === 200) {
          const build = res.json();
          let progress = 0;
          if (build.status === 'RUNNING') {
            for (let i = 0; i < build.projectBuilds.length; i++) {
              const buildProject = build.projectBuilds[i];
              for (let j = 0; j < buildProject.buildSteps.length; j++) {
                if (buildProject.buildSteps[j].status === 'IN_PROGRESS') {
                  progress = i / build.projectBuilds.length;
                }
              }
            }
          } else if (build.status === 'FINISHED') {
            progress = 1;
          }
          this.buildService.builds[targetTab].progress = progress;
          this.buildService.builds[targetTab].buildStatus = build.status;
          this.buildService.addListener(build.id);
        }
      }
    );
  }



  findTab(item) {
    return (item.id === this.id);
  }

  build() {
    let count = 0;
    for (let i = 0; i < this.version.commits.length; i++) {

      if (this.version.commits[i].selectProject === false) {
        count = count + 1;

      }

    }
    if (count === this.version.commits.length) {
      this.toastr.error('No Project has been selected. Please select atleast one project to build the collection');
    } else {
      this.buildService.postBuild(this.version).subscribe(
        response => {
          if (response.status === 200) {
            const buildId = response.json();
            this.buildprojects.frozen = true;
            this.version.frozen = true;
            this.buildService.builds.push({
              'id': this.version.id, 'name': this.collection[0].name, 'versionNum': this.version.number,
              'progress': 0, 'buildStatus': 'RUNNING', 'hidden': false
            });
            const targetTab = this.buildService.builds.length - 1;
            this.getBuildProcess(this.version.id, targetTab);
          } else if (response.status === 403) {
            this.router.navigateByUrl('/login');
          }
        }

      );
    }

  }

  deleteProject(fargCommit) {
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Removal is irreversible! Continue?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.commitService.deleteRepos(fargCommit.id).subscribe(
            response => {
              if (response.status === 200) {
                const d: any = this.version.commits;
                for (let i = 0; i < d.length; i++) {
                  if (d[i].id === fargCommit.id) {
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
          this.router.navigateByUrl('/editCollection/' + fargCollection.id);
        }
      }
    );
    this.saving = false;
  }


  back() {
    this.router.navigateByUrl('/collection');
  }

  showHermesResults(fargversion) {
    this.hermesService.getHermesStatus(fargversion.id).subscribe(
      response => {
        if (response.json().status === 'RUNNING') {
          this.toastr.error('Hermes process is still running');
        } else if (response.json().status === 'FINISHED') {
          this.openHermesViewerModal();
        }
      }
    );

  }

  openHermesViewerModal() {
    const modalRef = this.modalService.open(HermesViewerComponent, { size: 'lg' });
    modalRef.componentInstance.version = this.version;
  }

  removeFilter(fargversion) {

    this.loading = true;
    this.version.filtered = false;
    this.hermesService.getHermesStatus(fargversion.id).subscribe(
      response => {
        if (response.json().status === 'RUNNING') {
          this.toastr.error('Hermes is in progress, Please try again later');
        } else {
          this.hermesService.deleteHermes(response.json().id).subscribe(
            data => {
              if (data.status === 200) {
                this.toastr.success('Hermes Results succesfully unfiltered');
              } else {
                this.toastr.error('Failed with [' + data.status + '] ' + data.statusText);
              }
            }
          );
        }
      }
    );

    this.loading = false;

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

}

