import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Search } from '../models/search.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
import { MatTableDataSource, MatPaginator, MatSort, MatButtonToggleChange, MatAutocompleteSelectedEvent, MatChipInputEvent,
MatAutocomplete } from '@angular/material';
import * as _ from 'lodash';
import { throwIfEmpty, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Promise } from 'q';
import { escapeRegExp } from '@angular/compiler/src/util';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'abm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  model = new Search('', '', '&&', '', '');
  loading: boolean;
  onSearchError = false;
  results = [];
  resultDataSource = new MatTableDataSource<any>(this.results);
  toAdd = [];
  toAddDataSource = new MatTableDataSource<any>(this.toAdd);
  filterDataSource = new MatTableDataSource<any>([]);
  language = {};
  searched = false;
  isFilterVisible: false;
  isSelect;
  SortType: any = 'name';
  reverse = false;
  searchColumns: any[];
  addColumns: any[];
  filterColumns: any[];
  selection = new SelectionModel<any>(true, []);
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  queryCtrl = new FormControl();
  filteredQueries: Observable<string[]>;
  queries: string[] = [];
  allFilters: string[] = [];

  @ViewChild('queryInput') queryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild('resultPaginator') resultPaginator: MatPaginator;
  @ViewChild('filterPaginator') filterPaginator: MatPaginator;
  @ViewChild(MatSort) resultSort: MatSort;

  constructor(
    private service: SearchService,
    private collectionService: CollectionService,
    private router: Router,
    private route: ActivatedRoute,
    private orderPipe: OrderPipe
  ) {
    this.getFilter();
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

  search() {
    let searchQuery: string = this.queries.join('');
    this.loading = true;
    this.onSearchError = false;
    this.resultDataSource.data = [];
    this.service.getFiltersSearch(searchQuery).subscribe(
      resp => {
       try {
        let response = JSON.parse(resp.json());
        let data = [...response];
        this.resultDataSource.data = data.map(result => {
          return {
            id: result.id,
            source: result.metadata.source,
            metric: result.metricResults,
            singleSelection: false
          };
        });
        setTimeout(
          () => (this.resultDataSource.paginator = this.resultPaginator)
        );
        setTimeout(() => (this.resultDataSource.sort = this.resultSort));
        this.loading = false;
        this.searched = true;
       } catch (error) {
        this.onSearchError = true;
        this.loading = false;
       }
      },
      error => {
        this.onSearchError = true;
        this.loading = false;
      }
    );
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

  removeCart() {
    this.toAdd = [];
    this.toAdd = [...this.toAdd];
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


  ngOnInit() {
    this.searchColumns = ['id', 'metric', 'source', 'select'];
    this.addColumns = ['id', 'metric', 'source', 'select'];
    this.filterColumns = ['filter', 'value', 'operand', 'action'];
    this.toAdd = [];
  }

  getFilter() {
    /* fetchs filter - ebuka */
    this.service.getFilters().subscribe(resp => {
      let response = JSON.parse(resp.json());

      this.allFilters = [...response].map(filter => `[${filter}]`);
      this.filteredQueries = this.queryCtrl.valueChanges.pipe(
        startWith(null),
        map((query: string | null) =>
        query ? this._filter(query) : this.allFilters.slice()
        )
      );
       });
    }

  filter(filterValue: string) {
    this.filterDataSource.filter = filterValue.trim().toLowerCase();
  }

  clear() {
    this.queries = [];
  }

  addFilter() {
    let filter: string;
   if (this.queries.length > 0) {
     this.model.value = this.model.value.split(' ').join('');
     filter = `${this.model.operator}${this.model.negate}${this.model.filter}${this.model.value}`;
       } else {
        filter = `${this.model.negate}${this.model.filter}${this.model.value}`;
   }
   this.queries.push(filter);
   this.model.value = '';
  }

  applyDataSourceFilter(filterValue: string) {
    this.resultDataSource.filter = filterValue.trim().toLowerCase();
  }

  add(event: MatChipInputEvent): void {
    // Add filter only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our filter
      if ((value || '').trim()) {
        this.queries.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.queryCtrl.setValue(null);
    }
  }

  remove(query: string): void {
    const index = this.queries.indexOf(query);

    if (index >= 0) {
      this.queries.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.queries.push(event.option.viewValue);
    this.queryInput.nativeElement.value = '';
    this.queryCtrl.setValue(null);
  }

  onChangeNegate(event: MatButtonToggleChange) {
   event.source.checked ? this.model.negate = '!' : this.model.negate = '';
  }

private _filter(value: string): string[] {
    let filterValue = value.toLowerCase();
    return this.allFilters.filter(query  => query.toLowerCase().indexOf(filterValue) === 0);
  }
}
