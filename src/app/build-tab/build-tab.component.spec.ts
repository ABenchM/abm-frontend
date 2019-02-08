import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildTabComponent } from './build-tab.component';
import { BuildColourPipe } from '../shared/build-colour.pipe';
import { TabTitlePipe } from '../shared/tab-title.pipe';
import { BuildService } from '../services/build.service';
import { HttpModule } from '@angular/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('BuildTabComponent', () => {
  let component: BuildTabComponent;
  let fixture: ComponentFixture<BuildTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildTabComponent, BuildColourPipe, TabTitlePipe ],
      imports: [HttpModule, ToastrModule.forRoot(), NgbModule.forRoot()],
      providers: [BuildService, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
