import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublicCollectionsComponent } from './manage-public-collections.component';

describe('ManagePublicCollectionsComponent', () => {
  let component: ManagePublicCollectionsComponent;
  let fixture: ComponentFixture<ManagePublicCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePublicCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePublicCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
