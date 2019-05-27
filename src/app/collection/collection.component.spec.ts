import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectionComponent } from './collection.component';
import { ContextMenuService } from 'ngx-contextmenu';
import { CollectionService } from '../services/collection.service';
import { OrderModule } from 'ngx-order-pipe';
import { MatFormFieldModule, MatTableModule, MatMenuModule,
  MatIconModule, MatSortModule, MatPaginatorModule, MatToolbarModule, MatDialogModule} from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClient , HttpHandler } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ CollectionComponent ],
  //     imports: [OrderModule, MatFormFieldModule , MatTableModule , MatMenuModule, MatSortModule, MatPaginatorModule,
  //     MatIconModule, MatToolbarModule, HttpModule, RouterTestingModule, NgbModule.forRoot(), MatDialogModule],
  //     providers: [HttpClient, HttpHandler, ContextMenuService, CollectionService]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CollectionComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
