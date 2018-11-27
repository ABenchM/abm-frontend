import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../models/user.model';


@Component({
  selector: 'abm-delete-dialogbox',
  templateUrl: './delete-dialogbox.component.html',
  styleUrls: ['./delete-dialogbox.component.css']
})
export class DeleteDialogboxComponent {

  val: boolean = false;

  constructor(public dialogRef:MatDialogRef<DeleteDialogboxComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  onNoClick(){
    this.dialogRef.close();
  }

  onConfirm(){
    this.val=true;
    this.dialogRef.close();
  }

  callback(){
    return this.val;
  }
}