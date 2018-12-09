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
import { CurrentUserService } from '../services/current-user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let el: DebugElement;
  let element : HTMLElement;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [LoginComponent,
        AboutComponent
      ],
      imports: [
        FormsModule, ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([{ path: 'about', component: AboutComponent }])
      ],
      providers: [
        CurrentUserService, ToastrService,
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
    el = fixture.debugElement;
    element = el.nativeElement;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('Error message on login failed', async(() => {
    component.loginFailed = true;
    fixture.detectChanges();
    const error_msg = fixture.debugElement.nativeElement;
    expect(error_msg.querySelectorAll('strong').length).toBe(1);
  }));

  fit('Successful Login', async(() => {
    spyOn(component, 'loginForm').and.returnValue(false);
    expect(component.loginForm()).toBeFalsy();
  }));
  
  fit('check for Asterisk in the Login label', () => {
    el = fixture.debugElement;
    console.log(el);
    element = el.nativeElement;
    fixture.detectChanges();
    expect(element.textContent).toContain('Login');
    
  });
  
});