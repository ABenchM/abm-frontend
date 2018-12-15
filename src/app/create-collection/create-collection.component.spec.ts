import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollectionComponent } from './create-collection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CollectionService } from '../services/collection.service';
import { CommitService } from '../services/commit.service';
import { DataServiceService } from '../services/data-service.service';

describe('CreateCollectionComponent', () => {
  let component: CreateCollectionComponent;
  let fixture: ComponentFixture<CreateCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCollectionComponent ],
      imports: [FormsModule, HttpModule, ReactiveFormsModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [ToastrService, CollectionService, CommitService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
