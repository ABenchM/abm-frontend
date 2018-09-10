import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {AboutComponent} from '../about/about.component';
import { AddToCollectionComponent } from './add-to-collection.component';
import { CollectionService } from '../services/collection.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommitService } from '../services/commit.service';
import { HttpModule } from '@angular/http';

describe('AddToCollectionComponent', () => {
  let component: AddToCollectionComponent;
  let fixture: ComponentFixture<AddToCollectionComponent>;

  beforeEach(async(() => {

    // const collectionService = jasmine.createSpyObj('CollectionService', ['getCollections']);

    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(),
                RouterTestingModule.withRoutes([{ path: 'addToCollection', component: AddToCollectionComponent }]),
                HttpModule],
      declarations: [ AddToCollectionComponent ],
      providers: [
        CollectionService,
        ToastrService,
        CommitService
          ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
