import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderModule } from 'ngx-order-pipe';
import { ProjectCountPipe } from '../project-count.pipe';
import { SearchService } from '../services/search.service';
import { CollectionService } from '../services/collection.service';
import { FileSizePipe } from '../shared/file-size.pipe';
import { SiteNamePipe } from '../shared/site-name.pipe';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { MatTableModule, MatInputModule, MatSortModule, MatFormFieldModule, MatCheckboxModule, MatAutocompleteModule,
   MatSelectModule } from '@angular/material';
import { MatMenuModule, MatIconModule, MatPaginatorModule, MatDialogModule, MatButtonToggleModule,
  MatChipsModule } from '@angular/material';
import { ToastrModule, ToastrService } from 'ngx-toastr';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, ProjectCountPipe, FileSizePipe, SiteNamePipe],
      imports: [FormsModule, ReactiveFormsModule, HttpModule, RouterTestingModule, OrderModule,
        MatMenuModule, MatIconModule, MatFormFieldModule, MatDialogModule, MatPaginatorModule,
        MatSortModule, MatTableModule, MatInputModule, MatCheckboxModule, MatButtonToggleModule,
        BrowserAnimationsModule, MatChipsModule, MatAutocompleteModule, MatSelectModule, ToastrModule.forRoot()],
        providers: [SearchService, CollectionService, HttpClient, HttpHandler, ToastrService]
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
