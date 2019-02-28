import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CollectionService } from '../services/collection.service';
import { Search } from '../models/search.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PinService } from '../services/pin.service';
import { DataServiceService } from '../services/data-service.service';
import { OrderPipe } from 'ngx-order-pipe';
import { Collection } from '../models/collection.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  displayedColumns: string[] = ['name', 'description', 'creation_date', 'id', 'pin', 'versions' ];
  columnsToDisplay: string[] = ['versionNo', 'VersionID'];
  dataSourcePub = new MatTableDataSource<Collection>();
  dataSourcePin = new MatTableDataSource<Collection>();
  dataPub = new MatTableDataSource<any>();
  dataPin = new MatTableDataSource<any>();
  expandedElement: any;
  versions: any[] = [{}];
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  isExpansionDetailRow = (row: any) => row.hasOwnProperty('detailRow');

  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute,
    private pinService: PinService, private dataService: DataServiceService,
    private orderPipe: OrderPipe) { }

  loadPublicCollections() {
    this.loading = true;
    this.service.getPublicCollections().subscribe(response => {
      if (response.status === 200 && response.json() !== null) {
        this.publicCollections = this.orderPipe.transform(response.json());
        this.dataSourcePub.data = this.publicCollections;
        setTimeout(() => this.dataSourcePub.paginator = this.paginator.toArray()[1]);
        setTimeout(() => this.dataSourcePub.sort = this.sort.toArray()[1]);
        if (this.loggedInStatus()) {
          this.loadPinned();
        }
      }

    });
    this.loading = false;
  }

  loadPinned() {
    this.loading = true;
    for (let i = 0; i < this.dataSourcePub.data.length; i++) {
      this.checkPinned(this.dataSourcePub.data[i]);
    }
    this.service.getPinnedCollections(localStorage.getItem('currentUser')).subscribe(response => {
      if (response.status === 200 && response.json()
       !== null) {
        this.pinned = this.orderPipe.transform(response.json());
        this.dataSourcePin.data = this.pinned;
        setTimeout(() => this.dataSourcePin.paginator = this.paginator.toArray()[0]);
        setTimeout(() => this.dataSourcePin.sort = this.sort.toArray()[0]);
      }

    });

    this.loading = false;
  }

  checkPinned(item) {
    this.pinService.checkPinned(item).subscribe(
      response => {
        if (response.status === 200) {
          item.dataSourcePin = response.json();

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

  ngOnInit() {
    this.loadPublicCollections();
  }

  applyFilterPub(filterValue: string) {
    this.dataSourcePub.filter = filterValue.trim().toLowerCase();
  }

  applyFilterPin(filterValue: string) {
    this.dataSourcePin.filter = filterValue.trim().toLowerCase();
  }

}
