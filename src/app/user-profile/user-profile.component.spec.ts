import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Register } from '../services/register.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DialogService } from 'ng2-bootstrap-modal';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [FormsModule, HttpModule, RouterTestingModule, MatFormFieldModule, MatInputModule,
        BrowserAnimationsModule, ToastrModule.forRoot()],
      providers: [Register, ToastrService, DialogService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement;
    fixture.detectChanges();

  });




  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Save changes button should be disabled if any field is not given', () => {
    spyOn(component, 'saveChanges');
    const button = fixture.debugElement.nativeElement.querySelector('button');


    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(button.nativeElement.disabled).toBeTruthy();
    });
  });
});
