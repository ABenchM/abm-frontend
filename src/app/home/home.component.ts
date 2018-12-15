import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import { Search } from '../models/search.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PinService } from '../services/pin.service';
import { DataServiceService } from '../services/data-service.service';
import { OrderPipe } from 'ngx-order-pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'abm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  pinned: any[] = [];
  public publicCollections: any[] = [];
  cancelSearch: boolean;
  loading: boolean;
  reverse = false;
  sortType: any = 'name';
  disabled: boolean;

  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute,
    private pinService: PinService, private dataService: DataServiceService,
    private orderPipe: OrderPipe) { }

  model = new Search('');

  loadPublicCollections() {
    this.loading = true;
    this.service.getPublicCollections().subscribe(response => {
      if (response.status === 200 && response.json() !== null) {
        this.publicCollections = this.orderPipe.transform(response.json(), this.sortType);
        if (this.loggedInStatus()) {
          this.loadPinned();
        }
      }

    });
    this.loading = false;
  }

  setSortType(value) {
    if (this.sortType === value) {
      this.reverse = !this.reverse;
    }
    this.sortType = value;

  }

  loadPinned() {
    this.loading = true;
    for (let i = 0; i < this.publicCollections.length; i++) {
      this.checkPinned(this.publicCollections[i]);

    }
    this.service.getPinnedCollections(localStorage.getItem('currentUser')).subscribe(response => {

      console.log('pin ka response' + response.json());
      if (response.status === 200 && response.json() !== null) {
        this.pinned = this.orderPipe.transform(response.json(), this.sortType);
      }

    });

    this.loading = false;
  }

  checkPinned(item) {
    this.pinService.checkPinned(item).subscribe(
      response => {
        if (response.status === 200) {
          item.pinned = response.json();

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

  search(searchQuery) {
    let searching = true;
    this.cancelSearch = true;
    this.service.getSearchCollections(searchQuery).subscribe(
      response => {
        if (response.status === 200 && response.json() !== null) {
          this.publicCollections = response.json();
          if (this.loggedInStatus()) {
            for (let i = 0; i < this.publicCollections.length; i++) {
              this.checkPinned(this.publicCollections[i]);
            }
          }
        }

      });
    searching = false;
  }

  cancel() {
    this.model.query = '';
    this.cancelSearch = false;
    this.loadPublicCollections();
  }


  unpin(row) {
    this.disabled = true;
    this.pinService.deletePin(row).subscribe(
      response => {
        const pinnedIndex = this.pinned.findIndex(this.checkId, row.id);
        const publicIndex = this.publicCollections.findIndex(this.checkId, row.id);
        this.pinned.splice(pinnedIndex, 1);
        if (publicIndex >= 0) {
          this.publicCollections[publicIndex].pinned = false;
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
        this.pinned.push(row);
        const targetIndex = this.publicCollections.findIndex(this.checkId, row.id);
        this.publicCollections.splice(targetIndex, 1);

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
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
