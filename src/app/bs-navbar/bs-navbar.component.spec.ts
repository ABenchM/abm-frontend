import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from '../services/login.service';
import { BsNavbarComponent } from './bs-navbar.component';
import { HttpModule } from '@angular/http';
import { CurrentUserService } from '../services/current-user.service';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async(() => {

    // const dummyUser = 'test1';
    // let dummyCurrentUserService = {
    //   username: () => {
    //     return dummyUser;
    //   }
    // };
    TestBed.configureTestingModule({
      declarations: [BsNavbarComponent],
      imports: [HttpModule, MatMenuModule, MatIconModule, RouterTestingModule, RouterModule],
      providers: [Login,  CurrentUserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
