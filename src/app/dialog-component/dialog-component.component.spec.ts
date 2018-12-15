import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponentComponent } from './dialog-component.component';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';

describe('DialogComponentComponent', () => {
  let component: DialogComponentComponent;
  let fixture: ComponentFixture<DialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponentComponent ],
      imports: [FormsModule],
      providers: [DialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
