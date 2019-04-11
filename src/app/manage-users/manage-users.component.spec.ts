import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatInputModule, MatSortModule, MatFormFieldModule, MatCheckboxModule} from '@angular/material';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatPaginatorModule, MatDialogModule} from '@angular/material';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Checkbox click should select a row', () => {
    const checkbox = fixture.debugElement.nativeElement.querySelector('mat-checkbox');
    checkbox.click();
    fixture.whenStable().then(() => {
    expect(component.selection.selected).not.toBeNull();
    });
   });

   it('Mat-select trigger should return 2 items for selection', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();
    expect(trigger.childElementCount).toBe(2);
    });

  it('DeleteSelectedUsers Button should invoke corresponding method', () => {
    const deleteUser = spyOn(component, 'deleteSelectedUsers');
    fixture.debugElement.query(By.css('#buttonL')).triggerEventHandler('click', null);
    expect(deleteUser).toHaveBeenCalled();
    });

  it('should check for apply filter keyup event', () => {
    spyOn(component, 'applyFilter');
    fixture.detectChanges();
    const input = debugElement.query(By.css('#filter_data'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilter).toHaveBeenCalled();
    });

  });
