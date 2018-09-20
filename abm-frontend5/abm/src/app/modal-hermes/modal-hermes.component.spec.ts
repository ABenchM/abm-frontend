import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHermesComponent } from './modal-hermes.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../services/data-service.service';
import { HermesService } from '../services/hermes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HermesNamePipe } from '../shared/hermes-name.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmDialogModule } from 'primeng/primeng';

describe('ModalHermesComponent', () => {
  let component: ModalHermesComponent;
  let fixture: ComponentFixture<ModalHermesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHermesComponent, HermesNamePipe ],
      imports: [ ToastrModule.forRoot(), FormsModule, HttpModule, ModalModule.forRoot(),
         ReactiveFormsModule, RouterTestingModule, NgbModule.forRoot(), ConfirmDialogModule],
      providers: [DataServiceService, ToastrService, HermesService, NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHermesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
