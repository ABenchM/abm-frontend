import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteDialogboxComponent } from '../delete-dialogbox/delete-dialogbox.component';
import { OrderPipe } from 'ngx-order-pipe';

import { CollectionService } from '../services/collection.service';
import { Collection } from '../models/collection.model';

@Component({
  selector: 'abm-manage-public-collections',
  templateUrl: './manage-public-collections.component.html',
  styleUrls: ['./adminUIS.css']
})
export class ManagePublicCollectionsComponent implements OnInit {
  public publicCollections: any[] = [];
  loading: boolean;
  confirm:boolean=false;
  displayedColumns: any[] = ['select','id','name','description','creationDate','actions'];
  dataSource = new MatTableDataSource<Collection>();
  selection = new SelectionModel<Collection>(true, []);

  constructor(private router: Router, private service: CollectionService, private orderPipe: OrderPipe, public dialog: MatDialog) { }

  openDialog(col: Collection) : void{
    const dialogRef = this.dialog.open(DeleteDialogboxComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirm = dialogRef.componentInstance.callback();       
        if(this.confirm){
        this.deleteSingleCol(col);
      } 
    });      
  }

  deleteColsDialog() : void{
    const dialogRef = this.dialog.open(DeleteDialogboxComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirm = dialogRef.componentInstance.callback();       
        if(this.confirm){
        this.deleteSelectedCols();
      } 
    });      
  }

  getAllCollections(){
    this.loading = true;
    this.service.getAllCollections().subscribe(response => {
      this.publicCollections = this.orderPipe.transform(response.json());
      this.dataSource.data = this.publicCollections;
    });
    this.loading = false;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;  
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getAllCollections();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSingleCol(coll: Collection ){
    this.service.deleteSingleCol(coll).subscribe(result=>{
      this.getAllCollections();
    });
  }

  deleteSelectedCols(){
      let cols: Collection[] = this.selection.selected;
      let colIDs: String  = "";
      for (let col of cols) {
        colIDs = colIDs + col.id + ',';
      }
      this.service.deleteSelectedCols(colIDs).subscribe(result=>{
        this.getAllCollections();
      });
  }

  NavigateToCollection(col:Collection){
    if(col.isActive)
      this.router.navigateByUrl('/view/' + col.id);
  }

  changeColStatus(coll:Collection){
    this.service.changeCollectionStatus(coll).subscribe(result=>{
      this.getAllCollections();
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  SelectionIsEmpty(){
    return this.selection.selected.length == 0;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
