import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogboxComponent } from './delete-dialogbox.component';

describe('DeleteDialogboxComponent', () => {
  let component: DeleteDialogboxComponent;
  let fixture: ComponentFixture<DeleteDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
