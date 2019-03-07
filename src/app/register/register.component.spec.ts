import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { Register } from '../services/register.service';
import { User } from '../models/user.model';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatMenuModule, MatIconModule, MatFormFieldModule, MatDialogModule, MatPaginatorModule,
  MatSortModule, MatTableModule, MatInputModule, MatCheckboxModule, MatButtonToggleModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  // let registerService : Register;
  let affiliationel: DebugElement;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, HttpModule, RouterTestingModule, MatMenuModule,
        MatIconModule, MatFormFieldModule, MatDialogModule, MatPaginatorModule,
        MatSortModule, MatTableModule, MatInputModule, MatCheckboxModule, MatButtonToggleModule,
        BrowserAnimationsModule],
      providers: [Register]
    });
    // .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    // registerService = TestBed.get(Register);
    affiliationel = fixture.debugElement.query(By.css('input[type=text]'));
    submitEl = fixture.debugElement.query(By.css('button'));

  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
  //  fit('submit button disabled when any of the field is empty', () => {
  //    affiliationel.nativeElement.value = '';
  //     fixture.detectChanges();
  //    expect(submitEl.nativeElement.disabled).toBeTruthy();

  //   });
});
