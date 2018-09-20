import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommitSelectorComponent } from './commit-selector.component';
import { CommitService } from '../services/commit.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('CommitSelectorComponent', () => {
  let component: CommitSelectorComponent;
  let fixture: ComponentFixture<CommitSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitSelectorComponent ],
      imports: [NgbModule.forRoot(), HttpModule, FormsModule, ReactiveFormsModule, ModalModule],
      providers: [NgbActiveModal, CommitService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
