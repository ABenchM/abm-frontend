import { NgModule } from '@angular/core';

import {
  MatFormFieldModule, MatSelectModule, MatTooltipModule,
  MatButtonToggleModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatButtonModule, MatMenuModule, MatSortModule,
  MatIconModule,
  MatTableModule, MatExpansionModule ,
  MatDialogModule, MatCheckboxModule, MatPaginatorModule, MatInputModule, MatChipsModule
} from '@angular/material';


@NgModule({

  exports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatAutocompleteModule
  ]
})
export class MdComponentModule { }
