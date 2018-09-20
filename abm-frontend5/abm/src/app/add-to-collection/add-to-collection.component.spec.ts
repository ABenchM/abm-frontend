// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import {AboutComponent} from '../about/about.component';
// import { AddToCollectionComponent } from './add-to-collection.component';
// import { CollectionService } from '../services/collection.service';
// import { ToastrService, ToastrModule } from 'ngx-toastr';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { CommitService } from '../services/commit.service';
// import { HttpModule } from '@angular/http';

// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/of';

// describe('AddToCollectionComponent', () => {
//   let component: AddToCollectionComponent;
//   let fixture: ComponentFixture<AddToCollectionComponent>;

//   beforeEach(async(() => {

//     const dummyCommits = [
//       {commitId: 1}
//     ];
//     const dummyCollections = [
//      {id: 1, name: 'apache'}
//     ];

//   let dummyCommitService = {
//        getCommits: () => {
//          return Observable.of(dummyCommits);
//        }
//   };
//   let dummyCollectionService = {
//        getCollections: () => {
//          return Observable.of(dummyCollections);
//        }
//   };

//     TestBed.configureTestingModule({
//       imports: [ToastrModule.forRoot(),
//                 RouterTestingModule,
//                 HttpModule],
//       declarations: [ AddToCollectionComponent ],
//       providers: [
//         ToastrService,
//         {provide: CollectionService, useValue: dummyCollectionService},
//         {provide: CommitService, useValue: dummyCommitService}
//           ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddToCollectionComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

// });
