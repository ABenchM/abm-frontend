import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CollectionService } from '../services/collection.service';
import { Search } from '../models/search.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PinService } from '../services/pin.service';
import { OrderPipe } from 'ngx-order-pipe';
import { SelectionModel } from '@angular/cdk/collections';
import { Collection } from '../models/collection.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'abm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  pinned: any[] = [];
  public publicCollections: any[] = [];
  loading: boolean;
  disabled: boolean;
  displayedColumns: string[];
  columnsToDisplay: string[] = ['versionNo', 'VersionID', 'DoI'];
  dataSourcePub = new MatTableDataSource<Collection>();
  dataSourcePin = new MatTableDataSource<Collection>();
  dataPub = new MatTableDataSource<any>();
  dataPin = new MatTableDataSource<any>();
  expandedElement: any;
  versions: any[] = [{}];
  pinnedversions: any[] = [{}];
  selection = new SelectionModel<Collection>(true, []);
  pinselection = new SelectionModel<Collection>(true, []);
  @ViewChildren('pinPaginator') pinPaginator = new QueryList<MatPaginator>();
  @ViewChildren('pubPaginator') pubPaginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  isExpansionDetailRow = (row: any) => row.hasOwnProperty('detailRow');

  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute,
    private pinService: PinService,
    private orderPipe: OrderPipe) { }

  loadPublicCollections() {
    this.loading = true;
    this.service.getPublicCollections().subscribe(response => {
      if (response.status === 200 && response.json() !== null) {
        this.publicCollections = this.orderPipe.transform(response.json());
        let j = 0;
        while (j < this.publicCollections.length) {
          this.versions = this.publicCollections[j].versions;
          let i = 0;
          while (i < this.versions.length) {
            // console.log('Status and id ' + response.json()[0].versions[i].privateStatus + ' ' + response.json()[0].versions[i].id);
            if (this.versions[i].privateStatus === true) {

              this.versions.splice(i, 1);

            } else {
              i = i + 1;
            }
          }
          if (this.versions.length <= 0) {
            this.publicCollections.splice(j, 1);
          } else {
            j = j + 1;
          }
        }
        this.dataSourcePub.data = this.publicCollections;
        setTimeout(() => this.dataSourcePub.paginator = this.pubPaginator.toArray()[0]);
        setTimeout(() => this.dataSourcePub.sort = this.sort.toArray()[1]);
        if (this.loggedInStatus()) {
          this.loadPinned();
        }
      }

    });
    this.loading = false;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourcePub.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourcePub.data.forEach(row => this.selection.select(row));
  }

  isAllPinSelected() {
    const numSelected = this.pinselection.selected.length;
    const numRows = this.dataSourcePin.data.length;
    return numSelected === numRows;
  }
  masterPinToggle() {
    this.isAllPinSelected() ?
      this.pinselection.clear() :
      this.dataSourcePin.data.forEach(row => this.pinselection.select(row));
  }
  loadPinned() {
    this.loading = true;
    for (let i = 0; i < this.dataSourcePub.data.length; i++) {
      this.checkPinned(this.dataSourcePub.data[i]);
    }
    this.service.getPinnedCollections(localStorage.getItem('currentUser')).subscribe(response => {
      if (response.status === 200 && response.json() !== null) {
        this.pinned = this.orderPipe.transform(response.json());
        let j = 0;
        while (j < this.pinned.length && this.pinned.length !== 0 ) {
          this.pinnedversions = this.pinned[j].versions;
          let i = 0;
          while (i < this.pinnedversions.length) {
            // console.log('Status and id ' + response.json()[0].versions[i].privateStatus + ' ' + response.json()[0].versions[i].id);
            if (this.pinnedversions[i].privateStatus === true) {
              console.log('Deleting version ' + this.pinnedversions[i].id);
              this.pinnedversions.splice(i, 1);

            } else {
              i = i + 1;
            }
          }
          if (this.pinnedversions.length <= 0) {
            this.pinned.splice(j, 1);
          } else {
            j = j + 1;
          }
        }
        this.dataSourcePin.data = this.pinned;
        setTimeout(() => this.dataSourcePin.paginator = this.pinPaginator.toArray()[0]);
        setTimeout(() => this.dataSourcePin.sort = this.sort.toArray()[0]);
      }

    });

    this.loading = false;
  }

  openVersion(versions, versionID) {
    let i = 0;
    let index;
    while (i < versions.length) {
      if (versions[i].id === versionID) {
        index = i;
      }
      i++;
    }
    if (index != null) {
      index++;
      this.router.navigateByUrl('/view/' + versions[0].collectionId + '/' + index);
    }
  }

  checkPinned(item) {
    this.pinService.checkPinned(item).subscribe(
      response => {
          item.dataSourcePin = response;

        } , (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
            console.log('client side error occured');

         } else {
            console.log('Server side error occured');
         }

      }
    );
  }
  view(collectionId) {
    this.router.navigateByUrl('/view/' + collectionId);
  }

  open(col: Collection) {
    this.router.navigateByUrl('/view/' + col.id);
  }

  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  unpin(row) {
    this.disabled = true;
    this.pinService.deletePin(row).subscribe(
      response => {
        const pinnedIndex = this.dataSourcePin.data.findIndex(this.checkId, row.id);
        const publicIndex = this.dataSourcePub.data.findIndex(this.checkId, row.id);
        this.dataSourcePin.data.splice(pinnedIndex, 1);
        if (publicIndex >= 0) {
          this.dataSourcePub.data[publicIndex].pinned = false;
        }
        this.loadPublicCollections();
      }
    );
    this.disabled = false;
  }

  pin(row) {
    this.disabled = true;
    this.pinService.postPin(row).subscribe(
      response => {
        this.dataSourcePin.data.push(row);
        const targetIndex = this.dataSourcePub.data.findIndex(this.checkId, row.id);
        this.dataSourcePub.data.splice(targetIndex, 1);
        this.loadPublicCollections();
      }
    );
    this.disabled = false;
  }

  checkId(item) {
    return (item.id === this);
  }

  isselected() {
    if (this.selection.selected.length >= 1) {
      return false;
    } else {
      return true;
    }
  }

  isPinselected() {
    if (this.pinselection.selected.length >= 1) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    if (this.loggedInStatus()) {
      this.displayedColumns = ['select', 'name', 'description', 'creation_date', 'id', 'pin', 'versions'];
    } else {
      this.displayedColumns = ['select', 'name', 'description', 'creation_date', 'id', 'versions'];
    }
    this.loadPublicCollections();
  }

  applyFilterPub(filterValue: string) {
    this.dataSourcePub.filter = filterValue.trim().toLowerCase();
  }

  pinSelectedCollections() {
    this.selection.selected.forEach(item => {
      this.pin(item);
    });

  }

  UnpinSelectedCollections() {
    this.pinselection.selected.forEach(item => {
      this.unpin(item);
    });

  }

  applyFilterPin(filterValue: string) {
    this.dataSourcePin.filter = filterValue.trim().toLowerCase();
  }

}
