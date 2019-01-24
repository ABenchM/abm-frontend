import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { CollectionService } from '../services/collection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Collection } from '../models/collection.model';


@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [ConfirmationService]
})
export class CollectionComponent implements OnInit {

  selected = 'Version1';
  public userCollections: any[] = [];
  displayedColumns: any[] = ['id', 'name', 'description', 'creationDate', 'versions'];
  dataSource = new MatTableDataSource<Collection>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CollectionService, private router: Router,
    private route: ActivatedRoute, private orderPipe: OrderPipe, private confirmationService: ConfirmationService) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      this.service.getCollections(localStorage.getItem('currentUser')).subscribe(response => {
        if (response.status === 200 && response.json() !== null) {
          this.userCollections = this.orderPipe.transform(response.json());
          this.dataSource.data = this.userCollections;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }, (error) => {
        console.log('user not logged in');
      });
    }
  }

}
