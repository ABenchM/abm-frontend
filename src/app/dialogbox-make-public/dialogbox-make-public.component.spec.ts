import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxMakePublicComponent } from './dialogbox-make-public.component';

describe('DialogboxMakePublicComponent', () => {
  let component: DialogboxMakePublicComponent;
  let fixture: ComponentFixture<DialogboxMakePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogboxMakePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogboxMakePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
