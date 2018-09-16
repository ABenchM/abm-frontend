import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { CollectionService } from '../services/collection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import { ContextMenuComponent } from 'ngx-contextmenu';
import * as _ from "lodash";
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'abm-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [ConfirmationService]
})
export class CollectionComponent implements OnInit, OnDestroy {

  hasCollections = false;
  SortType: any = 'name';
  filterType: any = 'name';
  reverse = false;
  userCollections: any[] = [];
  filteredCollections: any[];
  collectionColumns: any[];
  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  // subscription: Subscription;
  constructor(private service: CollectionService, private router: Router,
    private route: ActivatedRoute, private orderPipe: OrderPipe, private confirmationService:ConfirmationService) {

  }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }


  setSortType(value) {
    if (this.SortType === value) {
      this.reverse = !this.reverse;
    }
    this.SortType = value;
  }
  open(row) {
    if (row.privateStatus) {
      this.router.navigateByUrl('/editCollection/' + row.id);
    } else {
      this.router.navigateByUrl('/view/' + row.id);
    }

  }

  setFilterType(item) {
    this.filterType = item;
  }

  filter(query) {
    if (this.filterType === 'name') {
      this.filteredCollections = (query) ?
        this.userCollections.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : this.userCollections;
    } else if (this.filterType === 'description') {
      this.filteredCollections = (query) ?
        this.userCollections.filter(p => p.description.toLowerCase().includes(query.toLowerCase())) : this.userCollections;
    } else if (this.filterType === 'builtStatus') {

      if (query.toLowerCase().includes('n')) {
        this.filteredCollections = this.userCollections.filter(p => p.builtStatus === false);
      } else {
        this.filteredCollections = this.userCollections.filter(p => p.builtStatus === true);
      }

    } else if (this.filterType === 'privateStatus') {

      if (query.toLowerCase().includes('pr')) {
        this.filteredCollections = this.userCollections.filter(p => p.privateStatus === true);
      } else {
        this.filteredCollections = this.userCollections.filter(p => p.privateStatus === false);
      }

    }


  }
  ngOnInit() {
    this.collectionColumns =  [
          { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'creationdate', header: 'Creation Date' },
      { field: 'id', header: 'Id' },
      { field: 'builtsstatus', header: 'Built Status' },
      { field: 'privatestatus', header: 'Private Status' }
    ];

    if (localStorage.getItem('currentUser') != null) {

      this.service.getCollections(localStorage.getItem('currentUser')).subscribe(response => {
        this.userCollections = this.filteredCollections = this.orderPipe.transform(response.json(), this.SortType);
        for (let i = 0; i < this.userCollections.length; i++) {
          for (let j = 0; j < this.userCollections[i].versions.length; j++) {
            if (this.userCollections[i].versions[j].frozen === true) {
              this.userCollections[i].builtStatus = true;
              break;
            }
          }
          if (this.userCollections[i].builtStatus === undefined) {
            this.userCollections[i].builtStatus = false;
          }
        }
        this.hasCollections = true;
      });
    }

  }

  ngOnDestroy() {
    //  this.subscription.unsubscribe();
  }

  onContextMenu(event, item) {
    console.log("isnide method",item, event);
    let msg="";
    if(item.privateStatus == true){
      msg = 'Make Collection Public!';
      this.confirmationService.confirm({
        message: msg,
        accept: () => {
          console.log("isnide accet method");
          let selectedRowIndex = _.findIndex(this.filteredCollections, function(o){return (o.id === item.id)})
  
          this.filteredCollections[selectedRowIndex].privateStatus = false;
          console.log(this.filteredCollections[selectedRowIndex]);
          this.service.updateCollection(this.filteredCollections[selectedRowIndex]).subscribe(
            response => {
              if (response.status === 200) {
                this.router.navigateByUrl('/collection');
              }
            });
        }
    });
    
    } 
    
  }

}

 /* Collection status can change both ways
 
 onContextMenu(event, item) {
  console.log("isnide method",item, event);
  let msg="";
  if(item.privateStatus == true){
    msg= 'Make Collection Public!';
  } else{
    msg = 'Make Collection Private!'
    
  }
  this.confirmationService.confirm({
    message: msg,
    accept: () => {
      console.log("isnide accet method");
      let selectedRowIndex = _.findIndex(this.filteredCollections, function(o){return (o.id === item.id)})

      this.filteredCollections[selectedRowIndex].privateStatus = (item.privateStatus == true)?false:true;
      console.log(this.filteredCollections[selectedRowIndex]);
      this.service.updateCollection(this.filteredCollections[selectedRowIndex]).subscribe(
        response => {
          if (response.status === 200) {
            this.router.navigateByUrl('/collection');
          }
        });
    }
});
  
}

} */