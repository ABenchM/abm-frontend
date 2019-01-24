import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { CollectionService } from '../services/collection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import { ContextMenuComponent } from 'ngx-contextmenu';
import * as _ from 'lodash';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Collection } from '../models/collection.model';
import { take } from 'rxjs/operators';


@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [ConfirmationService]
})
export class CollectionComponent implements OnInit {

  public publicCollections: any[] = [];
  displayedColumns: any[] = ['id', 'name', 'description', 'creationDate', 'versions'];
  dataSource = new MatTableDataSource<Collection>();

  userCollections: any[] = [];

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
          this.publicCollections = this.orderPipe.transform(response.json());
          this.dataSource.data = this.publicCollections;
        }
      }, (error) => {
        console.log('user not logged in');
      });
    }
  }

}
