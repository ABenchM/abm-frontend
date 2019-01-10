import { async, ComponentFixture, TestBed } from '@angular/core/testing';
  import { BrowserModule, By} from '@angular/platform-browser';
  import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
  import { MatTableModule, MatInputModule, MatSortModule, MatFormFieldModule, MatDialogRef} from '@angular/material';
  import {MatCheckboxModule, MatPaginatorModule, MatButtonModule} from '@angular/material';
  import { MatMenuModule, MatIconModule, MatToolbarModule, MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';
  import { AdminPendingReqComponent } from './admin-pending-req.component';
  import { DebugElement } from '@angular/core';
  import { HttpModule } from '@angular/http';
  import { HttpClient, HttpHandler } from '@angular/common/http';
  import { OrderModule } from 'ngx-order-pipe';
  import { UserService } from '../services/user.service';
  import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
  import { MatDialogModule} from '@angular/material/dialog';
  import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

  describe('AdminPendingReqComponent', () => {
   let component: AdminPendingReqComponent;
   let fixture: ComponentFixture<AdminPendingReqComponent>;
   let debugElement: DebugElement;

   beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ AdminPendingReqComponent, DialogBoxComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [BrowserModule, BrowserAnimationsModule, HttpModule, MatToolbarModule, MatMenuModule,
    MatIconModule, MatTableModule, MatInputModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSortModule,
    MatPaginatorModule, OrderModule, MatDialogModule, MatButtonModule],
    providers:  [UserService, HttpClient, HttpHandler, {
      provide: MatDialogRef, useValue: {}
      }, {
      provide: MAT_DIALOG_DATA, useValue: {}
      },
      {
      provide: MatTableDataSource, useValue: {}
      }]
      })
      .compileComponents();
      }));

   beforeEach(() => {
   fixture = TestBed.createComponent(AdminPendingReqComponent);
   component = fixture.componentInstance;
   debugElement = fixture.debugElement;
   fixture.detectChanges();
   });

   fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should have a h2 tag of `Pending Request', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.nativeElement;
    expect(de.querySelector('h2').textContent).toContain('Pending Request');
  });

  fit('should check for apply filter keyup event', () => {
    spyOn(component, 'applyFilter');
    fixture.detectChanges();
    const input = debugElement.query(By.css('#filter_data'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilter).toHaveBeenCalled();
    });

  fit('should call masterToggle on change checkbox', () => {
    const checkbox = spyOn(component, 'masterToggle');
    fixture.debugElement.query(By.css('#CheckBox')).triggerEventHandler('change', {});
    expect(checkbox).toHaveBeenCalled();
    });

  fit('should invoke approveSelectedUsers button', () => {
    const approveSelectedUsers = spyOn(component, 'approveSelectedUsers');
    fixture.debugElement.query(By.css('#buttonR')).triggerEventHandler('click', null);
    expect(approveSelectedUsers).toHaveBeenCalled();
  });

  fit('should invoke rejectSelectedUsers button', () => {
  const rejectSelectedUsers = spyOn(component, 'rejectSelectedUsers');
  fixture.debugElement.query(By.css('#buttonL')).triggerEventHandler('click', null);
  expect(rejectSelectedUsers).toHaveBeenCalled();
  });
  });
