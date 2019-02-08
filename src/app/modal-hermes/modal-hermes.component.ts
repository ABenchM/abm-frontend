import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HermesService } from '../services/hermes.service';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../services/data-service.service';



@Component({
  selector: 'abm-modal-hermes',
  templateUrl: './modal-hermes.component.html',
  styleUrls: ['./modal-hermes.component.css']
})
export class ModalHermesComponent implements OnInit {

  @Input() version: any;
  @Input() collection: any;
  @Input() running: boolean;
  timer: any;
  filterList: any[] = [];
  loading: boolean;
  constructor(public activeModal: NgbActiveModal, private service: HermesService, private dataService: DataServiceService,
    private toastr: ToastrService,
    private viewf: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(viewf);

  }

  run() {
    this.loading = true;
    this.service.runHermes(this.version.id, this.filterList).subscribe(
      response => {
        if (response.status === 200) {
          this.toastr.success('Hermes has been started');
          this.loading = false;
          this.activeModal.close();
          this.timer = setTimeout((): void => this.poller(), 100);
        }
      }
    );
  }

  poller() {

    this.service.getHermesStatus(this.version.id).subscribe(response => {
      if (response.status === 200) {
        if (response.json().status === 'FINISHED') {
          this.dataService.setRunning(false);
          clearTimeout(this.timer);
        } else {
          this.timer = setTimeout((): void => this.poller(), 8000);
        }
      }
    }
    );
  }

  loadFilters() {
    this.loading = true;
    this.service.getActiveFilters(this.version).subscribe(response => {
      if (response.status === 200) {
        this.filterList = response.json();

      }
      this.loading = false;
    });

  }
  ngOnInit() {
    this.loadFilters();
  }

}
