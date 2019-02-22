import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { BuildTabComponent } from './build-tab/build-tab.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DataTableModule, PaginatorModule, MessageService } from 'primeng/primeng';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BuildColourPipe } from './shared/build-colour.pipe';
import { TabTitlePipe } from './shared/tab-title.pipe';
import { Idle, IdleExpiry } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Logout } from './services/logout.service';
import { Services } from '@angular/core/src/view';
import { Login } from './services/login.service';
import { CurrentUserService } from './services/current-user.service';
import { BuildService } from './services/build.service';

export class MockExpiry extends IdleExpiry {
  public lastDate: Date;
  public mockNow: Date;

  last(value?: Date): Date {
    if (value !== void 0) {
      this.lastDate = value;
    }

    return this.lastDate;
  }

  now(): Date {
    return this.mockNow || new Date();
  }
}

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        DataTableModule,
        ToastModule,
        PaginatorModule,
        RouterTestingModule,
        MatMenuModule,
        MatIconModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        AppComponent,
        BsNavbarComponent,
        BuildTabComponent,
        BuildColourPipe,
        TabTitlePipe
      ],
      providers: [Idle, { provide: IdleExpiry, useClass: MockExpiry },
        Keepalive, MessageService, HttpClient, HttpHandler, Logout, Login, CurrentUserService, BuildService, ToastrService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
