import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Login} from '../services/login.service';
import { BsNavbarComponent } from './bs-navbar.component';
import { CapitalizeFirstPipe } from '../shared/capitalize-first.pipe';
import { HttpModule } from '@angular/http';
import { CurrentUserService } from '../services/current-user.service';
import { MatButtonModule, MatMenuModule, MatIconModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, MatDialogModule, MatCheckboxModule } from '@angular/material';

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavbarComponent, CapitalizeFirstPipe ],
      imports: [HttpModule,MatButtonModule, MatMenuModule, MatIconModule, MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatDialogModule,
        MatCheckboxModule],
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
