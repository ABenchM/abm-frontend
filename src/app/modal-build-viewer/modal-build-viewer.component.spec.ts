import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuildViewerComponent } from './modal-build-viewer.component';

describe('ModalBuildViewerComponent', () => {
  let component: ModalBuildViewerComponent;
  let fixture: ComponentFixture<ModalBuildViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBuildViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBuildViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
