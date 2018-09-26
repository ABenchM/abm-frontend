import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingReqComponent } from './admin-pending-req.component';

describe('AdminPendingReqComponent', () => {
  let component: AdminPendingReqComponent;
  let fixture: ComponentFixture<AdminPendingReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPendingReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
