import { AdminPendingReqComponent } from './admin-pending-req.component';
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

describe('AdminPendingReqComponent', () => {
  let component: AdminPendingReqComponent;
  let fixture: ComponentFixture<AdminPendingReqComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingReqComponent ],
      imports: [BrowserModule, BrowserAnimationsModule, HttpModule, MatToolbarModule, MatMenuModule, MatIconModule, MatTableModule,
        MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSortModule, MatPaginatorModule,
        OrderModule, MatDialogModule],
      providers: [UserService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingReqComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a h2 tag of `Pending Request', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.nativeElement;
    expect(de.querySelector('h2').textContent).toContain('Pending Request');
  });

  it('should invoke approveSelectedUsers button', () => {
    const approveSelectedUsers = spyOn(component, 'approveSelectedUsers');
    fixture.debugElement.query(By.css('#buttonR')).triggerEventHandler('click', null);
    expect(approveSelectedUsers).toHaveBeenCalled();
  });

  it('should invoke rejectSelectedUsers button', () => {
  const rejectSelectedUsers = spyOn(component, 'rejectSelectedUsers');
  fixture.debugElement.query(By.css('#buttonL')).triggerEventHandler('click', null);
  expect(rejectSelectedUsers).toHaveBeenCalled();
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
