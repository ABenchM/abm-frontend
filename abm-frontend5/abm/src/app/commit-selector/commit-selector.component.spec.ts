import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitSelectorComponent } from './commit-selector.component';

describe('CommitSelectorComponent', () => {
  let component: CommitSelectorComponent;
  let fixture: ComponentFixture<CommitSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
