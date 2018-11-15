import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule, By} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatTableModule, MatInputModule, MatSortModule, MatFormFieldModule, MatCheckboxModule, MatPaginatorModule, MatDialogModule} from '@angular/material';
import { MatMenuModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';

import { DebugElement } from '@angular/core';
import { UserService } from '../services/user.service';

import { ManageUsersComponent } from './manage-users.component';

describe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUsersComponent ],
      imports: [BrowserModule, BrowserAnimationsModule, HttpModule, MatToolbarModule, MatMenuModule, MatIconModule, MatTableModule, 
        MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSortModule, MatPaginatorModule,
        OrderModule, MatDialogModule],
      providers: [UserService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  // fit('should check for isAllSelected function call', async(() => {
  //   spyOn(component, 'isAllSelected');
  //   const checkbox = fixture.debugElement.nativeElement.querySelector('mat-checkbox');
  //   checkbox.click();
  //   //fixture.whenStable().then(() => {
  //   expect(component.isAllSelected).toHaveBeenCalled();
  //   //});
  // }));

  fit('should check for apply filter keyup event', () => {
    spyOn(component, 'applyFilter');
    fixture.detectChanges();
    const input = debugElement.query(By.css('#filter_data'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilter).toHaveBeenCalled();
    });

    xit('should check for ooopenDialog function call', async(() => {
      spyOn(component, 'deleteSelectedUsers');
    fixture.detectChanges();
    const input = debugElement.query(By.css('#button_alignR'));
    const inputElement = input.nativeElement;
    inputElement.click();
    expect(component.deleteSelectedUsers).toHaveBeenCalled();
    }));

});
