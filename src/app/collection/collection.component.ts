import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { CollectionService } from '../services/collection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';


import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Collection } from '../models/collection.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogboxMakePublicComponent } from '../dialogbox-make-public/dialogbox-make-public.component';

@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CollectionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public userCollections: any[] = [];
  displayedColumns: any[] = ['id', 'name', 'description', 'creationDate', 'versions'];
  columnsToDisplay: string[] = ['versionNo', 'VersionID', 'Status', 'Actions'];
  dataSource = new MatTableDataSource<Collection>();
  data = new MatTableDataSource<any>();
  expandedElement: any;
confirm = true;
  isExpansionDetailRow = (row: any) => row.hasOwnProperty('detailRow');

  constructor(private service: CollectionService, private router: Router,
    private route: ActivatedRoute, private orderPipe: OrderPipe,
    public dialog: MatDialog) { }

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

  open(row) {
      this.router.navigateByUrl('/editCollection/' + row.id);
  }

  openVersion(collection, versionID) {
    let i = 0;
    let index;
    while (i < collection.versions.length) {
      if (collection.versions[i].id === versionID) {
        index = i;
      }
      i++;
    }
    if (index != null) {
      index++;
      this.router.navigateByUrl('/editCollection/' + collection.id + '/' + index);
    }
  }

  openDialog(collection: Collection, version: any): void {
    const dialogRef = this.dialog.open(DialogboxMakePublicComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirm = dialogRef.componentInstance.callback();
      if (this.confirm) {
        version.privateStatus = false;
        this.service.updateCollection(collection).subscribe(
          response => {
            if (response.status === 200) {
              this.service.updateVersion(version).subscribe(data => {
                if (data.status === 200) {
                  this.router.navigateByUrl('/collection');
                }
              });

            }
          });
      }
    });
  }

}
