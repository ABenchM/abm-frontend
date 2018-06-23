import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import { Search } from '../models/search.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PinService } from '../services/pin.service';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'abm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pinned: any[];
  public publicCollections: any[] = [];
  cancelSearch: boolean;
  loading: boolean;
  disabled: boolean;
  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute,
    private pinService: PinService, private dataService: DataServiceService) { }

  model = new Search('');

  loadPublicCollections() {
    this.loading = true;
    this.service.getPublicCollections().subscribe(response => {
      this.publicCollections = response.json();
      if (this.loggedInStatus()) {
        this.loadPinned();
      }
    });
    this.loading = false;
  }


  loadPinned() {
    this.loading = true;
    for (let i = 0; i < this.publicCollections.length; i++) {
      this.checkPinned(this.publicCollections[i]);

    }
    this.service.getPinnedCollections().subscribe(response => {
      this.pinned = response.json();
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

  open(collection) {
    this.router.navigateByUrl('/view/' + collection.id);
  }
  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  search(searchQuery) {
    console.log('searching .....' + searchQuery);
    let searching = true;
    this.cancelSearch = true;
    this.service.getSearchCollections(searchQuery).subscribe(
      response => {
        console.log('Service results ' + response.json());
        this.publicCollections = response.json();
        for (let i = 0; i < this.publicCollections.length; i++) {
          this.checkPinned(this.publicCollections[i]);

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
        this.publicCollections.splice(targetIndex, 1) ;

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
}
