import { Component, OnInit , Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'abm-commit-selector',
  templateUrl: './commit-selector.component.html',
  styleUrls: ['./commit-selector.component.css']
})
export class CommitSelectorComponent implements OnInit {


  @Input() commit: any ;
  loading: boolean;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
