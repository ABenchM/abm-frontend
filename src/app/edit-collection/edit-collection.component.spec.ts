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
import { CommitService } from '../services/commit.service';
import { DataServiceService } from '../services/data-service.service';
import { HermesService } from '../services/hermes.service';
import { BuildService } from '../services/build.service';
import { MatDialogModule } from '@angular/material';

describe('EditCollectionComponent', () => {
  let component: EditCollectionComponent;
  let fixture: ComponentFixture<EditCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCollectionComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule,
             RouterTestingModule, HttpModule, ToastrModule.forRoot(), NgbModule.forRoot()],
      providers: [HttpClient, HttpHandler, CollectionService, DialogService,
        ToastrService, CommitService, DataServiceService, HermesService, BuildService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
