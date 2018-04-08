import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionDropDownComponent } from './version-drop-down.component';

describe('VersionDropDownComponent', () => {
  let component: VersionDropDownComponent;
  let fixture: ComponentFixture<VersionDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
