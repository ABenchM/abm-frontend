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

}

/*
export interface Element {
  id: string;
  name: string;
  description: string;
  owner: string;
  creationDate:string;
  status:string;
}

const ELEMENT_DATA: Element[] = [
  { id: "894cd- 5desc1 1223445", name: 'Java', description: "Java is a general-purpose computer-programming language that is concurrent class-based Java is a general-purpose computer-programming language that is concurrent class-based Java is a general-purpose computer-programming language that is concurrent class-based", owner: 'Vishal', creationDate: "14/02/2018",status:"Active"},
  { id: "894cd- 5desc1 1223445", name: 'Machine learning', description: "Machine learning is a subset of artificial intelligence in the field", owner: 'Menal', creationDate: "12/01/108",status:"Active" },
  { id: "894cd- 5desc1 1223445", name: 'Angular', description: "Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team", owner: 'Talal', creationDate: "12/01/108",status:"Inctive" },
  { id: "894cd- 5desc1 1223445", name: 'Java', description: "Java is a general-purpose computer-programming language that is concurrent class-based", owner: 'Vishal', creationDate: "14/02/2018",status:"Active"},
  { id: "894cd- 5desc1 1223445", name: 'Machine learning', description: "Machine learning is a subset of artificial intelligence in the field", owner: 'Menal', creationDate: "12/01/108",status:"Active" },
  { id: "894cd- 5desc1 1223445", name: 'Angular', description: "Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team", owner: 'Talal', creationDate: "12/01/108",status:"Inctive" },
  { id: "894cd- 5desc1 1223445", name: 'Java', description: "Java is a general-purpose computer-programming language that is concurrent class-based", owner: 'Vishal', creationDate: "14/02/2018",status:"Active"},
  { id: "894cd- 5desc1 1223445", name: 'Machine learning', description: "Machine learning is a subset of artificial intelligence in the field", owner: 'Menal', creationDate: "12/01/108",status:"Active" },
  { id: "894cd- 5desc1 1223445", name: 'Angular', description: "Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team", owner: 'Talal', creationDate: "12/01/108",status:"Inctive" },
  { id: "894cd- 5desc1 1223445", name: 'Java', description: "Java is a general-purpose computer-programming language that is concurrent class-based", owner: 'Vishal', creationDate: "14/02/2018",status:"Active"},
  { id: "894cd- 5desc1 1223445", name: 'Machine learning', description: "Machine learning is a subset of artificial intelligence in the field", owner: 'Menal', creationDate: "12/01/108",status:"Active" },
  { id: "894cd- 5desc1 1223445", name: 'Angular', description: "Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team", owner: 'Talal', creationDate: "12/01/108",status:"Inctive" },
  { id: "894cd- 5desc1 1223445", name: 'Java', description: "Java is a general-purpose computer-programming language that is concurrent class-based", owner: 'Vishal', creationDate: "14/02/2018",status:"Active"},
  { id: "894cd- 5desc1 1223445", name: 'Machine learning', description: "Machine learning is a subset of artificial intelligence in the field", owner: 'Menal', creationDate: "12/01/108",status:"Active" },
  { id: "894cd- 5desc1 1223445", name: 'Angular', description: "Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team", owner: 'Talal', creationDate: "12/01/108",status:"Inctive" },
  { id: "894cd- 5desc1 1223445", name: 'Java', description: "Java is a general-purpose computer-programming language that is concurrent class-based", owner: 'Vishal', creationDate: "14/02/2018",status:"Active"},
  { id: "894cd- 5desc1 1223445", name: 'Machine learning', description: "Machine learning is a subset of artificial intelligence in the field", owner: 'Menal', creationDate: "12/01/108",status:"Active" },
  { id: "894cd- 5desc1 1223445", name: 'Angular', description: "Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team", owner: 'Talal', creationDate: "12/01/108",status:"Inctive" },
];*/
