import { Component, OnInit , Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HermesService } from '../services/hermes.service';




@Component({
  selector: 'abm-modal-hermes',
  templateUrl: './modal-hermes.component.html',
  styleUrls: ['./modal-hermes.component.css']
})
export class ModalHermesComponent implements OnInit {

 @Input() version: any ;
 @Input() collection: any;

  filterList: any[] = [];
  loading; boolean;
  constructor(public activeModal: NgbActiveModal, private service: HermesService) {

  }

  loadFilters() {
    this.loading = true;
    this.service.getActiveFilters(this.version).subscribe(response =>  {
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
