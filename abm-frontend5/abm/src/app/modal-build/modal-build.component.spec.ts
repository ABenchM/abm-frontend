import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuildComponent } from './modal-build.component';

describe('ModalBuildComponent', () => {
  let component: ModalBuildComponent;
  let fixture: ComponentFixture<ModalBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
