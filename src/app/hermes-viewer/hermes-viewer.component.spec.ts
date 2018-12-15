import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HermesViewerComponent } from './hermes-viewer.component';
import { HermesService } from '../services/hermes.service';
import { HermesNamePipe } from '../shared/hermes-name.pipe';
import { HttpModule } from '@angular/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('HermesViewerComponent', () => {
  let component: HermesViewerComponent;
  let fixture: ComponentFixture<HermesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HermesViewerComponent , HermesNamePipe],
      imports: [NgbModule.forRoot(), HttpModule, ToastrModule.forRoot()],
      providers: [NgbActiveModal, HermesService, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HermesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
