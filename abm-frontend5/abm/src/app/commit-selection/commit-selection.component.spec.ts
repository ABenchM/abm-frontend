import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitSelectionComponent } from './commit-selection.component';

describe('CommitSelectionComponent', () => {
  let component: CommitSelectionComponent;
  let fixture: ComponentFixture<CommitSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
