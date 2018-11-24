import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Login} from '../services/login.service';
import { BsNavbarComponent } from './bs-navbar.component';
import { CapitalizeFirstPipe } from '../shared/capitalize-first.pipe';
import { HttpModule } from '@angular/http';
import { CurrentUserService } from '../services/current-user.service';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavbarComponent, CapitalizeFirstPipe ],
      imports: [HttpModule,RouterTestingModule,RouterModule],
      providers: [Login, CurrentUserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
