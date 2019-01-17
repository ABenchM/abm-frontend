import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By} from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconModule } from '@angular/material';
import { DeleteDialogboxComponent } from './delete-dialogbox.component';
import { MatDialogModule} from '@angular/material/dialog';

describe('DeleteDialogboxComponent', () => {
  let component: DeleteDialogboxComponent;
  let fixture: ComponentFixture<DeleteDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogboxComponent ],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
          },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('Confirm button click should invoke corresponding method', () => {
    const button = spyOn(component, 'onConfirm');
    fixture.debugElement.query(By.css('#buttonL')).triggerEventHandler('click', null);
    expect(button).toHaveBeenCalled();
    });
});
