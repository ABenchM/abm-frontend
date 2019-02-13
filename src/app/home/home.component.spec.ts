import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { BrowserModule, By} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatInputModule, MatSortModule, MatFormFieldModule, MatCheckboxModule} from '@angular/material';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatPaginatorModule, MatDialogModule} from '@angular/material';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CollectionService } from '../services/collection.service';
import { PinService } from '../services/pin.service';
import { DataServiceService } from '../services/data-service.service';
import { TableModule } from 'primeng/table';
import { OrderModule } from 'ngx-order-pipe';
import { DebugElement } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;

//  let request = require('request');
  let base_url = 'http://localhost:3000/rest/collection';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpModule, FormsModule, ReactiveFormsModule, RouterTestingModule, DataTableModule, PaginatorModule,
        TableModule, OrderModule, BrowserModule, BrowserAnimationsModule, HttpModule, MatToolbarModule, MatMenuModule,
        MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSortModule,
        MatPaginatorModule, OrderModule, MatDialogModule],
      providers: [CollectionService, PinService, DataServiceService, HttpClient, HttpHandler]
      
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should have a h2 tag of `Public Collection', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.nativeElement;
    expect(de.querySelector('h2').textContent).toContain('Public Collection');
  });

  fit('should check for apply filter keyup event', () => {
    spyOn(component, 'applyFilterPub');
    fixture.detectChanges();
    const input = debugElement.query(By.css('#filter_data1'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilterPub).toHaveBeenCalled();
    });
});
