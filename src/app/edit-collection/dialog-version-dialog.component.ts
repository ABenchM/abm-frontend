import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'abm-dialog-version-dialog',
    templateUrl: 'dialog-version-dialog.html',
  })
  export class DialogVersionDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<DialogVersionDialogComponent>) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
