import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionComponent } from './edit-collection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectionService } from '../services/collection.service';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from '../services/data-service.service';
import { MatDialogModule, MatFormFieldModule, MatSortModule, MatTableModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { MatMenuModule, MatIconModule, MatPaginatorModule, MatButtonToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditCollectionComponent', () => {
  let component: EditCollectionComponent;
  let fixture: ComponentFixture<EditCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCollectionComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatDialogModule,
        MatPaginatorModule,
        MatSortModule, MatTableModule, MatInputModule, MatCheckboxModule, MatButtonToggleModule,
        BrowserAnimationsModule,
        RouterTestingModule, HttpModule, ToastrModule.forRoot(), NgbModule.forRoot()],
      providers: [HttpClient, HttpHandler, CollectionService, DialogService,
        ToastrService,  DataServiceService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
