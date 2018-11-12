import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { PaginatorModule, DataTableModule, ContextMenuModule, ConfirmationService, ConfirmDialogModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ContextMenuService } from 'ngx-contextmenu';
import { BuiltStatusPipe } from '../shared/built-status.pipe';
import { CollectionService } from '../services/collection.service';
import { OrderModule } from 'ngx-order-pipe';
import { PrivateStatusPipe } from '../shared/private-status.pipe';
import { HttpClientModule } from '@angular/common/http';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionComponent, BuiltStatusPipe , PrivateStatusPipe ],
      imports: [PaginatorModule, DataTableModule, TableModule, ContextMenuModule, ConfirmDialogModule, OrderModule, HttpClientModule],
      providers: [ContextMenuService, CollectionService, ConfirmationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
