import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HermesViewerComponent } from './hermes-viewer.component';

describe('HermesViewerComponent', () => {
  let component: HermesViewerComponent;
  let fixture: ComponentFixture<HermesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HermesViewerComponent ]
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
