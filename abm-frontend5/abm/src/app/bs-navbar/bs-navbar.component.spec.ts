import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Login} from '../services/login.service';
import { BsNavbarComponent } from './bs-navbar.component';
import { CapitalizeFirstPipe } from '../shared/capitalize-first.pipe';
import { HttpModule } from '@angular/http';
import { CurrentUserService } from '../services/current-user.service';
<<<<<<< HEAD
import { MatButtonModule, MatMenuModule, MatIconModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
=======
import { MatMenuModule, MatIconModule} from '@angular/material';
>>>>>>> d6e6d31e63443a79c49bc034de744089938234e9

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavbarComponent, CapitalizeFirstPipe ],
      imports: [HttpModule, MatMenuModule, MatIconModule],
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
