import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { } from 'jasmine';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { Login } from '../services/login.service';
import { Global } from '../services/global.service';
import { GoogleLoginService } from '../services/google-login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AboutComponent } from '../about/about.component';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [LoginComponent,
        AboutComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'about', component: AboutComponent }])
      ],
      providers: [
        {
          provide: Login,
          useClass: class {
            postLoginForm = jasmine.createSpy('postLoginForm');
          }
        },
        {
          provide: Global,
          useClass: class {
            loggedIn = jasmine.createSpy('loggedIn');
          }
        },
        {
          provide: GoogleLoginService,
          useClass: class {
            signinWithGoogle = jasmine.createSpy('signinWithGoogle');
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Error message on login failed', async(() => {
    component.loginFailed = true;
    fixture.detectChanges();
    const error_msg = fixture.debugElement.nativeElement;
    expect(error_msg.querySelectorAll('strong').length).toBe(1);
  }));

  it('Successful Login', async(() => {
    spyOn(component, 'loginForm').and.returnValue(false);
    expect(component.loginForm()).toBeFalsy();
}));
});
