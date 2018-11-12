import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DataTableModule , PaginatorModule} from 'primeng/primeng';

import { CollectionService } from '../services/collection.service';
import { PinService } from '../services/pin.service';
import { DataServiceService } from '../services/data-service.service';
import { TableModule } from 'primeng/table';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpModule, FormsModule, ReactiveFormsModule, RouterTestingModule, DataTableModule, PaginatorModule,
         TableModule , OrderModule],
      providers: [CollectionService, PinService, DataServiceService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
