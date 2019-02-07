import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatIconModule } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatInputModule } from '@angular/material/input';
import { CollectionService } from '../services/collection.service';
import { Search } from '../models/search.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PinService } from '../services/pin.service';
import { DataServiceService } from '../services/data-service.service';
import { OrderPipe } from 'ngx-order-pipe';
import { Collection } from '../models/collection.model';

@Component({
  selector: 'abm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pinned: any[] = [];
  public publicCollections: any[] = [];
  cancelSearch: boolean;
  loading: boolean;
  disabled: boolean;
  displayedColumns: string[] = ['select', 'name', 'description', 'creation_date', 'id', 'pin'];
  dataSourcePub = new MatTableDataSource<Collection>();
  dataSourcePin = new MatTableDataSource<Collection>();
  selection = new SelectionModel<Collection>(true, []);

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute,
    private pinService: PinService, private dataService: DataServiceService,
    private orderPipe: OrderPipe) { }

  model = new Search('');

  loadPublicCollections() {
    this.loading = true;
    this.service.getPublicCollections().subscribe(response => {
      if (response.status === 200 && response.json() !== null) {
        this.publicCollections = this.orderPipe.transform(response.json());
        this.dataSourcePub.data = this.publicCollections;
        setTimeout(() => this.dataSourcePub.paginator = this.paginator.toArray()[1]);
        setTimeout(() => this.dataSourcePub.sort = this.sort.toArray()[1]);
        this.selection = new SelectionModel<Collection>(true, []);
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
        this.selection = new SelectionModel<Collection>(true, []);
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

  open(collection) {
    this.router.navigateByUrl('/view/' + collection.id);
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

  isAllSelectedPub() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourcePub.data.length;
    return numSelected === numRows;
  }

  masterTogglePub() {
    this.isAllSelectedPub() ?
      this.selection.clear() :
      this.dataSourcePub.data.forEach(row => this.selection.select(row));
  }

  isAllSelectedPin() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourcePin.data.length;
    return numSelected === numRows;
  }

  masterTogglePin() {
    this.isAllSelectedPin() ?
      this.selection.clear() :
      this.dataSourcePin.data.forEach(row => this.selection.select(row));
  }

}
