import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HermesService } from '../services/hermes.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'abm-hermes-viewer',
  templateUrl: './hermes-viewer.component.html',
  styleUrls: ['./hermes-viewer.component.css']
})
export class HermesViewerComponent implements OnInit {

  loading: boolean;
  results = [];
  @Input() version: any;
  constructor(public activeModal: NgbActiveModal, private service: HermesService, private toastr: ToastsManager,
    private viewf: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(viewf);
    }


  download() {
      this.service.getHermesStatus(this.version.id).subscribe(
        response => {
          if (response.json().status  === 'RUNNING') {
             this.toastr.error('Hermes is in progress, try again later');
          } else {
            location.href = '/downloadHermes/' + response.json().id;
          }
        }
      );
  }

  loadResults() {
    this.results = [];
    this.loading = true;
    console.log(this.version.id);
    this.service.getHermesResults(this.version.id).subscribe(
      response => {
        if (response.status === 200) {
          console.log(response.json());
          this.results = response.json();
        } else {
          this.toastr.error('Failed with [' + response.status + '] ' + response.statusText);
        }
      }
    );
    this.loading = false;
  }

  ngOnInit() {
    this.loadResults();
  }

}
