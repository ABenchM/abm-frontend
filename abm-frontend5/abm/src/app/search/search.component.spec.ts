import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderModule } from 'ngx-order-pipe';
import { ProjectCountPipe } from '../project-count.pipe';
import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { SearchService } from '../services/search.service';
import { CollectionService } from '../services/collection.service';
import { FileSizePipe } from '../shared/file-size.pipe';
import { SiteNamePipe } from '../shared/site-name.pipe';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent , ProjectCountPipe, FileSizePipe, SiteNamePipe],
      imports: [FormsModule, ReactiveFormsModule, HttpModule, RouterTestingModule, OrderModule, DataTableModule
        , PaginatorModule, TableModule],
        providers: [SearchService, CollectionService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
