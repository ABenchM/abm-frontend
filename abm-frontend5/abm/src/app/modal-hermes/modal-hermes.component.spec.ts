import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHermesComponent } from './modal-hermes.component';

describe('ModalHermesComponent', () => {
  let component: ModalHermesComponent;
  let fixture: ComponentFixture<ModalHermesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHermesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHermesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
