import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { OrderPipe } from 'ngx-order-pipe';

import { CollectionService } from '../services/collection.service';
import { Collection } from '../models/collection.model';

@Component({
  selector: 'abm-manage-public-collections',
  templateUrl: './manage-public-collections.component.html',
  styleUrls: ['./manage-public-collections.component.css']
})
export class ManagePublicCollectionsComponent implements OnInit {
  public publicCollections: any[] = [];
  loading: boolean;
  displayedColumns: any[] = ['select','id','name','description','creationDate','actions'];
  dataSource = new MatTableDataSource<Collection>();
  selection = new SelectionModel<Collection>(true, []);

  constructor(private service: CollectionService, private orderPipe: OrderPipe) { }

  loadCols() {
    this.loading = true;
    this.service.getPublicCollections().subscribe(response => {
      this.publicCollections = this.orderPipe.transform(response.json());
      this.dataSource.data = this.publicCollections;
    });
    this.loading = false;
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
    this.loadCols();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSingleCol(coll: Collection ){
    this.service.deleteSingleCol(coll).subscribe(result=>{
      this.loadCols();
    });
  }

  deleteSelectedCols(){

      let cols: Collection[] = this.selection.selected;
      let colIDs: String  = "";

      for (let col of cols) {
        colIDs = colIDs + col.id + ',';
      }

      this.service.deleteSelectedCols(colIDs).subscribe(result=>{
        this.loadCols();
      });
    
  }

  NavigateToCollection(col:Collection){
    
  }

  changeColStatus(coll:Collection){
    this.service.changeCollectionStatus(coll).subscribe(result=>{
      this.loadCols();
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  

}
