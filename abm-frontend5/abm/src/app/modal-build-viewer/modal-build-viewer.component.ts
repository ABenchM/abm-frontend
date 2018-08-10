import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { BuildService } from '../services/build.service';
import { WebsocketService } from '../services/websocket.service';
import { DialogService } from 'ng2-bootstrap-modal';
// import {accordion} from 'angular-ui-bootstrap/src/accordion';
// import {tabs} from 'angular-ui-bootstrap/src/tabs';


import { DialogComponentComponent } from '../dialog-component/dialog-component.component';

@Component({
  selector: 'abm-modal-build-viewer',
  templateUrl: './modal-build-viewer.component.html',
  styleUrls: ['./modal-build-viewer.component.css']
})
export class ModalBuildViewerComponent implements OnInit {


  @Input() showing: any;
  @Input() tabs: any;
  build: any = {};
  loading = false;
  socket: any;
  messageFromServer = '';
  isOpen = false;
  ws: any;
  targetTab: any;
  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastsManager, public activeModal: NgbActiveModal,
    private viewf: ViewContainerRef, private buildService: BuildService, private dialogservice: DialogService,
    private wsService: WebsocketService) {
    this.toastr.setRootViewContainerRef(viewf);

  }

  loadBuild(versionId) {
    this.loading = true;
    this.buildService.getBuild(versionId).subscribe(
      response => {
        if (response.status === 200) {
          this.build = response.json();
          if ((this.build.status === 'RUNNING' || this.build.status === 'WAITING') && this.ws === null) {
            console.log('opening websocket');
            this.openSocket(this.build.id);
          }
          for (let i = 0; i < this.build.projectBuilds.length; i++) {
            const currentBuild = this.build.projectBuilds[i];
            currentBuild.cssClass = 'info';
            for (let j = 0; j < currentBuild.buildSteps.length; j++) {
              const currentStep = currentBuild.buildSteps[j];
              if (currentStep.status === 'IN_PROGRESS') {
                currentStep.cssClass = 'warning';
                currentBuild.cssClass = 'warning';
              } else if (currentStep.status === 'SUCCESS') {
                currentStep.cssClass = 'success';
              } else if (currentStep.status === 'WAITING') {
                currentStep.cssClass = 'info';
              } else if (currentStep.status === 'FAILED') {
                currentStep.cssClass = 'danger';
                currentBuild.cssClass = 'danger';
              } else if (currentStep.status === 'FAILED') {
                currentStep.cssClass = 'warning';
              }
            }

            let allGood = currentBuild.buildSteps.length > 0;
            for (let j = 0; j < currentBuild.buildSteps.length; j++) {
              const currentStep = currentBuild.buildSteps[j];
              if (currentStep.status !== 'SUCCESS') {
                allGood = false;
              }
            }
            if (allGood) {
              currentBuild.cssClass = 'success';
            }

          }
        }
      });
    this.loading = false;
  }

  openSocket(buildId) {
    this.ws = new WebSocket('ws://localhost:8080/ws/build');
    this.ws.binaryType = 'arraybuffer';
    this.ws.onopen = function () {
      this.onOpen(buildId);


    };

    this.ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        const resp = JSON.parse(event.data);
        if (resp.msg === 'build_cancelled') {
          if (this.ws !== null) {
            this.ws.close();
            this.activeModal.close();
          }
        } else if (resp.msg === 'update') {
          if (resp.data === 'build_process_finished') {
            this.build.status = 'FAILED';
            for (let i = 0; i < this.build.projectBuilds.length; i++) {
              const currentBuild = this.build.projectBuilds[i];
              let allGood = true;
              for (let j = 0; j < currentBuild.buildSteps.length; j++) {
                if (currentBuild.buildSteps[j].status !== 'SUCCESS') {
                  allGood = false;
                }
              }
              if (allGood) { this.build.status = 'FINISHED'; }
            }
          }
        } else if (resp.msg === 'buildsteps') {
          if (this.build.status === 'WAITING') {
            this.build.status = 'RUNNING';

          }
          const repoId = resp.repository;
          const steps = resp.steps;
          for (let i = 0; i < this.build.projectBuilds.length; i++) {
            const currentBuild = this.build.projectBuilds[i];
            if (currentBuild.repositoryId === repoId) {
              currentBuild.buildSteps.clear();
              for (let j = 0; j < steps.length; j++) {
                const step = steps[j];
                step.cssClass = 'info';
                currentBuild.buildSteps.push(step);
              }
              break;
            }
          }
        } else if (resp.msg === 'build_finished') {
          const repoId = resp.repository;
          const steps = resp.steps;
          for (let i = 0; i < this.build.projectBuilds.length; i++) {
            const currentBuild = this.build.projectBuilds[i];
            if (currentBuild.repositoryId === repoId) {
              currentBuild.cssClass = 'success';
              for (let j = 0; j < currentBuild.buildSteps.length; j++) {
                const currentStep = currentBuild.buildSteps[j];
                if (currentStep.status === 'FAILED') {
                  currentBuild.cssClass = 'danger';
                  break;
                } else if (currentStep.status === 'CANCELLED') {
                  currentBuild.cssClass = 'info';
                  this.build.status = 'CANCELLED';
                  break;
                }
              }
              break;
            }
          }
        } else if (resp.msg === 'step_changed') {
          const step = resp.step;
          for (let i = 0; i < this.build.projectBuilds.length; i++) {
            const currentProjectBuild = this.build.projectBuilds[i];
            for (let j = 0; j < currentProjectBuild.buildSteps.length; j++) {
              const currentStep = currentProjectBuild.buildSteps[j];
              if (currentStep.id === step.id) {
                currentStep.status = step.status;
                currentStep.stderr = step.stderr;
                currentStep.stdout = step.stdout;
                if (step.status === 'IN_PROGRESS') {
                  currentStep.cssClass = 'warning';
                  currentProjectBuild.cssClass = 'warning';
                } else if (step.status === 'SUCCESS') {
                  currentStep.cssClass = 'success';
                } else if (step.status === 'FAILED') {
                  currentStep.cssClass = 'danger';
                  currentProjectBuild.cssClass = 'danger';
                }
                break;
              }
            }
          }

        } else {
          console.log('Text message received: ' + event.data);
        }
      } else {
        const arr = new Uint8Array(event.data);
        let hex = '';
        for (let i = 0; i < arr.length; i++) {
          hex += ('00' + arr[i].toString(16)).substr(-2);
        }
        console.log('Binary message received: ' + hex);
      }
    };
    this.ws.onclose = function (e) {

          this.onClose();
    };


  }

  onClose() {
    console.log('Connection closed.');
    this.ws = null;
    this.isOpen = false;
  }

  onOpen(buildId) {

    console.log('Connected!');
    this.ws.send(JSON.stringify({ msg: 'listen', id: buildId }));

  }

  select(target) {
    this.showing = target;
    this.loadBuild(target.id);
  }

  deleteBuild(buildId) {
    this.loading = true;
    const disposable = this.dialogservice.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Removal is irreversible! Continue?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.buildService.deleteBuild(buildId).subscribe(
          response => {
            if (response.status === 200) {
              this.targetTab = this.buildService.builds.findIndex(this.findTab, this.showing.id);
              this.buildService.builds.splice(this.targetTab, 1);
              this.activeModal.close();
            } else if (response.status === 403) {
              this.router.navigateByUrl('/login');
            }
          }
        );
      }
    });


    this.loading = false;
  }

  dismiss(tabId) {
    this.targetTab = this.buildService.builds.findIndex(this.findTab, tabId);
    this.buildService.builds[this.targetTab].hidden = true;
    if (this.showing.id === tabId) {
      this.activeModal.close();
    }
  }


  findTab(item) {
    return item.id === this;
  }

  cancelBuild(buildId) {

  }

  downloadArchive(buildResultId) {
    location.href = '/download/' + buildResultId;
  }

  ngOnInit() {
    this.loadBuild(this.showing.id);
    console.log(this.tabs);

  }

}
