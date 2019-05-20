import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import { By} from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconModule } from '@angular/material';
import { DialogBoxComponent } from './dialog-box.component';

describe('DialogBoxComponent', () => {
  let component: DialogBoxComponent;
  let fixture: ComponentFixture<DialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxComponent ],
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
    fixture = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create dialogbox', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke onClose button', () => {
    const onClose = spyOn(component, 'onClose');
    fixture.debugElement.query(By.css('#button')).triggerEventHandler('click', null);
    expect(onClose).toHaveBeenCalled();
    });
});

