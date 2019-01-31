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

  public publicCollections: any[] = [];
  loading: boolean;
  confirm = false;
  displayedColumns: any[] = ['select', 'id', 'name', 'description', 'creationDate', 'versions', 'actions'];
  columnsToDisplay: string[] = ['versionNo', 'VersionID', 'Status', 'Actions'];
  dataSource = new MatTableDataSource<Collection>();
  selection = new SelectionModel<Collection>(true, []);
  data = new MatTableDataSource<any>();
  expandedElement: any;
  isExpansionDetailRow = (row: any) => row.hasOwnProperty('detailRow');
  versions: any[] = [{}];
  viewCollection: any = [{}];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private service: CollectionService, private orderPipe: OrderPipe, public dialog: MatDialog) { }

  openDialog(col: Collection): void {
    const dialogRef = this.dialog.open(DeleteDialogboxComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirm = dialogRef.componentInstance.callback();
      if (this.confirm) {
        this.deleteSingleCol(col);
      }
    });
  }

  deleteColsDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogboxComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirm = dialogRef.componentInstance.callback();
      if (this.confirm) {
        this.deleteSelectedCols();
      }
    });
  }

  getAllCollections() {
    this.loading = true;
    this.service.getAllCollections().subscribe(response => {
      this.publicCollections = this.orderPipe.transform(response.json());
      for(int i=0;i<this.publicCollections.)
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

  deleteSingleCol(coll: Collection) {
    this.service.deleteSelectedCols(coll.id).subscribe(result => {
      this.getAllCollections();
    });
  }

  deleteSelectedCols() {
    let cols: Collection[] = this.selection.selected;
    let colIDs: String = '';
    for (let col of cols) {
      colIDs = colIDs + col.id + ',';
    }
    this.service.deleteSelectedCols(colIDs).subscribe(result => {
      this.getAllCollections();
    });
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  SelectionIsEmpty() {
    return this.selection.selected.length === 0;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getVersions(row: Collection) {
    this.service.getViewCollection(row.id).pipe(take(1)).subscribe(
      response => {
        if (response.status === 200) {
          if (response.json() !== undefined) {
            this.viewCollection = response.json();
            this.versions = response.json()[0].versions;
            console.log('versions length ' + this.versions.length);
            let i = 0;
            while (i < this.versions.length) {
              console.log('Status and id ' + response.json()[0].versions[i].privateStatus + ' ' + response.json()[0].versions[i].id);
              if (this.versions[i].privateStatus === true) {
                console.log('Deleting version ' + this.versions[i].id);
                this.versions.splice(i, 1);

              } else {
                i = i + 1;
              }
            }
            return this.versions;
          }
        }
      }
    );
  }

}
