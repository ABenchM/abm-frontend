import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../models/search.model';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { CollectionService } from '../services/collection.service';
import { OrderPipe } from 'ngx-order-pipe';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatButtonToggleChange
} from '@angular/material';
import * as _ from 'lodash';
import { throwIfEmpty } from 'rxjs/operators';
import { Promise } from 'q';

@Component({
  selector: 'abm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  model = new Search('');
  loading: boolean;
  onSearchError = false;
  results = [];
  resultDataSource = new MatTableDataSource<any>(this.results);
  toAdd = [];
  toAddDataSource = new MatTableDataSource<any>(this.toAdd);
  filterDataSource = new MatTableDataSource<any>([]);
  language = {};
  searched = false;
  isFilterVisible = false;
  filters: any;
  isSelect;
  SortType: any = 'name';
  reverse = false;
  searchColumns: any[];
  addColumns: any[];
  filterColumns: any[];
  selection = new SelectionModel<any>(true, []);
  @ViewChild('resultPaginator') resultPaginator: MatPaginator;
  @ViewChild('filterPaginator') filterPaginator: MatPaginator;
  @ViewChild(MatSort) resultSort: MatSort;

  constructor(
    private service: SearchService,
    private collectionService: CollectionService,
    private router: Router,
    private route: ActivatedRoute,
    private orderPipe: OrderPipe
  ) {}

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
    this.onSearchError = false;
    this.resultDataSource.data = [];
    this.service.getFiltersSearch(searchQuery).subscribe(resp => {
      let response = JSON.parse(resp.json());
      let data = [...response];
      this.resultDataSource.data = data.map(result => {
       return {
         id: result.id,
         source: result.metadata.source,
         metric: result.metricResults,
         singleSelection : false
       };
     });
      setTimeout(
        () => (this.resultDataSource.paginator = this.resultPaginator)
      );
      setTimeout(() => (this.resultDataSource.sort = this.resultSort));
      this.loading = false;
      this.searched = true;
    },
    error => {
      this.onSearchError = true;
      this.loading = false;
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

  // // deselectAll() {
  // //   for (let i = 0; i < this.results.length; i++) {
  // //     this.results[i].singleSelection = false;
  // //     this.service.project = [];
  // //     this.toAdd = [];
  // //   }
  // // }

  removeCart() {
    this.toAdd = [];
    this.toAdd = [...this.toAdd];
    // this.isSelect = !this.isSelect;
    // this.selectDeselectAll();
    this.selection.clear();
  }

  removeItem(item) {
    console.log(item);

    let itemId = item.id;
    for (let i = 0; i < this.toAdd.length; i++) {
      if (this.toAdd[i].id === itemId) {
        this.toAdd.splice(i, 1);
      }
    }
    this.toAdd = [...this.toAdd];
    console.log(this.resultDataSource.data);
    let index = _.findIndex(this.resultDataSource.data, function(o) {
      if (o.id === itemId) {
        return true;
      }
    });
    this.resultDataSource.data[index].singleSelection = false;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.resultDataSource.data.length;
    return numSelected === numRows;
  }

  selectDeselectAll() {
    this.isSelect = !this.isSelect;
    this.isAllSelected()
      ? this.selection.clear()
      : this.resultDataSource.data.forEach(row => this.selection.select(row));

    if (this.isAllSelected()) {
      this.service.project = [];
      this.toAdd = [];
      for (let i = 0; i < this.resultDataSource.data.length; i++) {
        this.resultDataSource.data[i].singleSelection = true;
        this.service.project.push(this.resultDataSource.data[i]);
      }
      this.toAdd = [...this.service.project];
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

    this.toAdd = _.uniq(this.toAdd);
    this.toAdd = [...this.toAdd];
  }

  getTotalItems() {
    return this.toAdd.length;
  }

  // openSource(item) {
  //   // window.location.href = item.repositoryUrl;
  //   window.open(item.repositoryUrl, '_blank');
  // }

  ngOnInit() {
    /*   this.searchColumns =  [
        { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
    { field: 'creationdate', header: 'Creation Date' },
    { field: 'size', header: 'Size' },
    { field: 'htmlUrl', header: 'Origin' }
  ]; */
    this.searchColumns = [
      'id',
      'metric',
      'source',
      'select'
    ];
    this.addColumns = [
      'id',
      'metric',
      'source',
      'select'
    ];
    this.filterColumns = ['filter', 'value', 'operand', 'action'];
    this.toAdd = [];
    this.resultDataSource.data = [];
    this.getFilter();
  }

  getFilter() {
    /* fetchs filter - ebuka */
    this.service.getFilters().subscribe(resp => {
      let response = JSON.parse(resp.json());
      let data = [...response];
      this.filterDataSource.data = data.map(filter => {
        return {
          filter,
          value: '',
          operand: '&&'
        };
      });
    });
    setTimeout(() => {
      this.filterDataSource.paginator = this.filterPaginator;
    });
  }

  filter(filterValue: string) {
    this.filterDataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleOperand(e: MatButtonToggleChange, row: any) {
    row.operand = e.value;
  }

  applyFilter(row: any) {
    this.model.query += this.parseFilter(row);
    row.value = '';
  }

  parseFilter(filter: any) {
    let value = this.model.query;
    if (value.trim().length < 1) {
      return `[${filter.filter}]${filter.value}`;
    }
    return `${filter.operand}[${filter.filter}]${filter.value}`;
  }

  applyDataSourceFilter(filterValue: string) {
    this.resultDataSource.filter = filterValue.trim().toLowerCase();
  }
}
