import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'abm-modal-build-viewer',
  templateUrl: './modal-build-viewer.component.html',
  styleUrls: ['./modal-build-viewer.component.css']
})
export class ModalBuildViewerComponent implements OnInit {

  constructor(private toastr: ToastsManager, public activeModal: NgbActiveModal,
    private viewf: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(viewf);

   }

  ngOnInit() {
  }

}
