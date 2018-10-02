import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'abm-dailogbox',
  templateUrl: './dailogbox.component.html',
  styleUrls: ['./dailogbox.component.css']
})
export class DailogboxComponent implements OnInit {

  constructor(public thisDialogRef:MatDialogRef<DailogboxComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onClose(){
  	this.thisDialogRef.close('clear');

  }

  onOK(){
  	this.thisDialogRef.close('OK');

  }

}