import { Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns: any[] = ['id','name','description','creationDate','actions'];
  dataSource = new MatTableDataSource<Collection>();
  

  constructor(private service: CollectionService, private orderPipe: OrderPipe) { }

  loadPublicCollections() {
    this.loading = true;
    this.service.getPublicCollections().subscribe(response => {
      this.publicCollections = this.orderPipe.transform(response.json());
      this.dataSource.data = this.publicCollections;
    });
    this.loading = false;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;  
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadPublicCollections();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePublicCollection(coll: Collection ){
    this.service.deletePublicCollection(coll).subscribe(result=>{
      this.loadPublicCollections();
    });
  }

  activeCollection(coll:Collection){
    this.service.changeCollectionStatus(coll).subscribe(result=>{
      this.loadPublicCollections();
    });
  }

}
