import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
    selector: 'abm-dialog-component',
    template: `<div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-header">
         <h4 class="modal-title">{{title}}</h4>
       </div>
       <div class="modal-body">
         <p>{{message}}</p>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
         <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
       </div>
     </div>
  </div>`,
    styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}
