import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MessageService} from '../services/message.service';
import {WebsocketService} from '../services/websocket.service';
import {ModalHermesComponent} from '../modal-hermes/modal-hermes.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommitSelectorComponent} from '../commit-selector/commit-selector.component';

import 'rxjs/add/operator/take';
import { buildDriverProvider } from 'protractor/built/driverProviders';

@Component({
  selector: 'abm-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {

  collection: any = [{}];
  versions: any = [{}];
  version: any = {};
  commits = [{}];
  derivedVersion: any = {};
  id;
  loading: boolean;
  saving: boolean;
  disabled: boolean;
  disableBuild: boolean;
  message = {};
  running: boolean;
  constructor(private route: ActivatedRoute, private router: Router,
    private service: CollectionService, private dialogService: DialogService,
    private toastr: ToastsManager, private viewf: ViewContainerRef, private webSocketService: WebsocketService,
    private messageService: MessageService, private modalService: NgbModal ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.toastr.setRootViewContainerRef(viewf);
    this.messageService.messages.subscribe(msg => {
      console.log('Response from server: ' + msg);
    });
  }

  loadCollection(collectionId) {
    this.loading = true;
    if (collectionId) {
      this.service.getCollectionById(collectionId).take(1).subscribe(response => {
        this.collection = response.json();
        this.versions = response.json()[0].versions;
        this.version = response.json()[0].versions[0];
        this.commits = response.json()[0].versions[0].commits;
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
               this.running = true;
               this.openHermesModal();
           }
         }
      }
    );

  }

  openHermesModal() {
   const modalRef = this.modalService.open(ModalHermesComponent , {size: 'lg'});
   modalRef.componentInstance.version = this.version;
   modalRef.componentInstance.collection = this.collection;

  }

  openCommitModal(commit) {
    const modalRef = this.modalService.open(CommitSelectorComponent, {size: 'lg'});
    modalRef.componentInstance.commit =  commit;

  }


  sendMsg(message) {
    console.log('Message from client: ', message);
    this.messageService.messages.next(message);
  }

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
                    this.toastr.success('Your collection is successfully deleted!!!');
                    d.splice(i, 1);
                    this.router.navigateByUrl('/collection');
                    break;
                  }
                }
              }

            }
          );
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
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

  ngOnInit() {
    this.loadCollection(this.id);
  }

}
