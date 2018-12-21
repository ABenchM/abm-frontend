import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectionService } from '../services/collection.service';
import { ViewService } from '../services/view.service';
import { DataServiceService } from '../services/data-service.service';
import { PinService } from '../services/pin.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComponent ],
      imports: [HttpModule, FormsModule, ReactiveFormsModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [CollectionService, ViewService, DataServiceService, PinService, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});