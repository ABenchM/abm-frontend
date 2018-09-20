import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from '../about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoutComponent } from './logout.component';
import { Logout } from '../services/logout.service';
import { HttpModule } from '@angular/http';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent , AboutComponent ],
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      providers: [ Logout
        // {
        //   provide: Logout,
        //   useClass: class {
        //     logout = jasmine.createSpy('logout');
        //   }
        // }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
