import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteDialogboxComponent } from '../delete-dialogbox/delete-dialogbox.component';
import { OrderPipe } from 'ngx-order-pipe';
import { Component, OnInit, ViewChild } from '@angular/core';

import { CollectionService } from '../services/collection.service';
import { Collection } from '../models/collection.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { take } from 'rxjs/operators';

@Component({
  selector: 'abm-manage-public-collections',
  templateUrl: './manage-public-collections.component.html',
  styleUrls: ['./manage-public-collections.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManagePublicCollectionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public publicCollections: any[] = [];
  selectedCollection: any;
  loading: boolean;
  confirm = false;
  displayedColumns: any[] = ['id', 'name', 'description', 'creationDate', 'actions', 'versions'];
  columnsToDisplay: string[] = ['versionNo', 'VersionID', 'Actions'];
  dataSource = new MatTableDataSource<Collection>();
  selection = new SelectionModel<Collection>(true, []);
  data = new MatTableDataSource<any>();
  expandedElement: any;
  versions: any[] = [{}];
  viewCollection: any = [{}];
  isExpansionDetailRow = (row: any) => row.hasOwnProperty('detailRow');

  constructor(private router: Router, private service: CollectionService, private orderPipe: OrderPipe, public dialog: MatDialog) { }

  openDialog(versionID: String): void {
    const dialogRef = this.dialog.open(DeleteDialogboxComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirm = dialogRef.componentInstance.callback();
      if (this.confirm) {
        this.deleteSingleCol(versionID);
      }
    });
  }

  setCollection(collection: Collection) {
    this.service.getCollectionById(collection.id).subscribe(response => {
      this.selectedCollection = this.orderPipe.transform(response.json());
    });
  }

  getAllCollections() {
    this.loading = true;
    this.service.getAllCollections().subscribe(response => {
      this.publicCollections = this.orderPipe.transform(response.json());
      let j: any;
      for (j = 0; j < this.publicCollections.length; j++) {
        this.versions = this.publicCollections[j].versions;
        console.log('versions length ' + this.versions.length);
        let i = 0;
        while (i < this.versions.length) {
          // console.log('Status and id ' + response.json()[0].versions[i].privateStatus + ' ' + response.json()[0].versions[i].id);
          if (this.versions[i].privateStatus === true) {
            console.log('Deleting version ' + this.versions[i].id);
            this.versions.splice(i, 1);

          } else {
            i = i + 1;
          }
        }
      }
      this.dataSource.data = this.publicCollections;
    });
    this.loading = false;
  }

  ngOnInit() {
    this.getAllCollections();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSingleCol(versionID: String) {
    if (this.selectedCollection[0].versions.length <= 1) {
      this.service.deleteCollectionByAdmin(this.selectedCollection[0].id).subscribe(result => {
        this.getAllCollections();
      });
    } else {
      this.service.deleteVersion(versionID).subscribe(result => {
        this.getAllCollections();
      });
    }
  }

  NavigateToCollection(col: Collection) {
    if (col.isActive) {
      this.router.navigateByUrl('/view/' + col.id);
    }
  }

  changeColStatus(coll: Collection) {
    this.service.changeCollectionStatus(coll).subscribe(result => {
      this.getAllCollections();
    });
  }

}
