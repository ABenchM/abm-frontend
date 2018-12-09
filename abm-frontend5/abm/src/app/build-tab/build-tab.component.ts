import { Component, OnInit } from '@angular/core';
import { BuildService } from '../services/build.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBuildViewerComponent } from '../modal-build-viewer/modal-build-viewer.component';

@Component({
  selector: 'abm-build-tab',
  templateUrl: './build-tab.component.html',
  styleUrls: ['./build-tab.component.css']
})
export class BuildTabComponent implements OnInit {

  constructor(private buildService: BuildService, private modalService: NgbModal) { }

  tabs = this.buildService.builds;
  isOpen = false;
  hideSidebar = false;


  open(buildId) {
    this.buildService.initialSelection = buildId;
    const modalRef = this.modalService.open(ModalBuildViewerComponent, { size: 'lg' });
    modalRef.componentInstance.showing = this.buildService.initialSelection;
    modalRef.componentInstance.tabs = this.buildService.builds;
    this.hideSidebar = true;
  }

  hide(tabId) {
    const targetTab = this.buildService.builds.findIndex(this.findTab, tabId);
    this.buildService.builds[targetTab].hidden = true;
  }

  initilize() {
    this.buildService.builds.splice(0, this.buildService.builds.length);
    console.log('currentUser ' + localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser') !== null) {
      this.buildService.getUserBuild(localStorage.getItem('currentUser')).subscribe(
        response => {
          console.log('bc stats bata' + response.status);
          if (response.status === 200) {
            const resp = response.json();
            for (let i = 0; i < resp.length; i++) {
              resp[i].hidden = false;
              this.buildService.builds.push(resp[i]);
              this.addBuildListener(resp[i].id);
            }
          } else if (response.status === 403) {
            console.log('Login first');
          }
        }
      );
    }
  }

  addBuildListener(versionId) {
    this.buildService.getBuild(versionId).subscribe(
      response => {
        if (response.status === 200) {
          this.buildService.addListener(response.json().id);
        }
      }
    );
  }

  findTab(item) {
    return item.id === this;
  }

  ngOnInit() {
    this.initilize();
  }

}
