import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtreeCompletionComponent } from './otree-completion.component';

describe('OtreeCompletionComponent', () => {
  let component: OtreeCompletionComponent;
  let fixture: ComponentFixture<OtreeCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtreeCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtreeCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
