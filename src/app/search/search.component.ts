import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../models/search.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { CollectionService } from '../services/collection.service';
import { OrderPipe } from 'ngx-order-pipe';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';




@Component({
  selector: 'abm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  model = new Search('');
  loading: boolean;
  results = [];
  resultDataSource = new MatTableDataSource<any>(this.results);
  toAdd = [];
  toAddDataSource = new MatTableDataSource<any>(this.toAdd);
  language = {};
  searched = false;
  isSelect;
  SortType: any = 'name';
  reverse = false;
  searchColumns: any[];
  addColumns: any[];
  selection = new SelectionModel<any>(true, []);
  @ViewChild('resultPaginator') resultPaginator: MatPaginator;
  @ViewChild(MatSort) resultSort: MatSort;

  constructor(private service: SearchService, private collectionService: CollectionService, private router: Router,
    private route: ActivatedRoute, private orderPipe: OrderPipe) {

    }



  setSortType(value) {
    if (this.SortType === value) {
      this.reverse = !this.reverse;
    }
    this.SortType = value;
  }

  addAll() {
    this.collectionService.toAdd = [];
    this.collectionService.toAdd = this.toAdd;
    this.router.navigateByUrl('/addToCollection');
  }


  createCollection() {
    this.collectionService.toCreate = [];
    this.collectionService.toCreate = this.toAdd;
    this.router.navigateByUrl('/createCollection');
  }



  loadStatus() {
    return this.loading;
  }

  search(searchQuery) {
    this.loading = true;
    this.resultDataSource.data = [];
    const language = '';
    this.service.getSearchResults(searchQuery, language).subscribe(response => {
      this.resultDataSource.data = response.json();
      setTimeout(() => this.resultDataSource.paginator = this.resultPaginator);
      setTimeout(() => this.resultDataSource.sort = this.resultSort);
      for (let i = 0; i < this.resultDataSource.data.length; i++) {
        this.resultDataSource.data[i].singleSelection = false;
      }
      // this.searchResults.query({ offset: 0 }).then(items => this.results = items);
      // this.searchResults.count().then(count => this.itemsCount = count);
      this.loading = false;
      this.searched = true;
    });

  }



  isProjectSelected() {
    if (!this.resultDataSource.data) {
      return false;
    }

    for (let i = 0; i < this.resultDataSource.data.length; i++) {
      if (this.resultDataSource.data[i].singleSelection === true) {
        return true;

      }
    }
    return false;
  }

  // deselectAll() {
  //   for (let i = 0; i < this.results.length; i++) {
  //     this.results[i].singleSelection = false;
  //     this.service.project = [];
  //     this.toAdd = [];
  //   }
  // }

  removeCart() {
    this.toAdd = [];
    this.isSelect = !this.isSelect;
  }

  removeItem(itemId) {
    console.log(itemId);

    itemId = itemId.id;
    for (let i = 0; i < this.toAdd.length; i++) {
      if (this.toAdd[i].id === itemId) {
        this.toAdd.splice(i, 1);
      }
    }
    this.toAdd = [...this.toAdd];
  }

  // selectAll() {
  //   for (let i = 0; i < this.results.length; i++) {
  //     this.results[i].singleSelection = true;
  //     this.service.project.push(this.results[i]);

  //   }
  //   this.toAdd = this.service.project;
  // }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.resultDataSource.data.length;
    return numSelected === numRows;
  }

  selectDeselectAll() {

    this.isSelect = !this.isSelect;
    console.log('isSelect ' + this.isSelect);


    this.isAllSelected() ?
      this.selection.clear() :
      this.resultDataSource.data.forEach(row => this.selection.select(row));


    if (this.isAllSelected()) {

      for (let i = 0; i < this.resultDataSource.data.length; i++) {
        this.resultDataSource.data[i].singleSelection = true;
        this.service.project.push(this.resultDataSource.data[i]);

      }
      this.toAdd = this.service.project;

    } else {
      for (let i = 0; i < this.resultDataSource.data.length; i++) {
        this.resultDataSource.data[i].singleSelection = false;
        this.service.project = [];
        this.toAdd = [];
      }
    }
    this.toAdd = [...this.toAdd];

  }

  select(item) {
    this.selection.toggle(item);

    for (let i = 0; i < this.resultDataSource.data.length; i++) {
      if (this.resultDataSource.data[i].id === item.id) {

        if (this.resultDataSource.data[i].singleSelection === true) {

          this.service.project.push(item);
          this.toAdd.push(item);
          this.toAdd = [...this.toAdd];
        } else {
          console.log('Value of item ' + item);
          this.service.project.splice(i, 1);
          console.log(this.toAdd.length);
          this.toAdd.splice(i, 1);
          console.log(this.toAdd.length);
          this.toAdd = [...this.toAdd];
        }

        break;
      }
    }
  }

  getTotalItems() {

    return this.toAdd.length;
  }

  openSource(item) {

    // window.location.href = item.repositoryUrl;
    window.open(item.repositoryUrl, '_blank');

  }

  ngOnInit() {
    /*   this.searchColumns =  [
        { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
    { field: 'creationdate', header: 'Creation Date' },
    { field: 'size', header: 'Size' },
    { field: 'htmlUrl', header: 'Origin' }
  ]; */
    this.searchColumns = ['name', 'description', 'creationDate', 'size', 'htmlUrl', 'select'];
    this.addColumns = ['name', 'description', 'creationDate', 'size', 'htmlUrl', 'select'];
    this.toAdd = [];
    this.resultDataSource.data = [];




  }

}
