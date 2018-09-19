import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'abm-delete-dialogbox',
  templateUrl: './delete-dialogbox.component.html',
  styleUrls: ['./delete-dialogbox.component.css']
})
export class DeleteDialogboxComponent implements OnInit {

  constructor(public thisDialogRef:MatDialogRef<DeleteDialogboxComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onCloseConfirm(){
  	this.thisDialogRef.close('Confirm');

  }

  onCloseCancle(){
  	this.thisDialogRef.close('Cancle');

  }

}
