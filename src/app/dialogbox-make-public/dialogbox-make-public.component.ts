import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'abm-dialogbox-make-public',
  templateUrl: './dialogbox-make-public.component.html',
  styleUrls: ['./dialogbox-make-public.component.css']
})
export class DialogboxMakePublicComponent {

  val = false;

  constructor(public dialogRef: MatDialogRef<DialogboxMakePublicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) { }

  onNoClick() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.val = true;
    this.dialogRef.close();
  }

  callback() {
    return this.val;
  }

}
