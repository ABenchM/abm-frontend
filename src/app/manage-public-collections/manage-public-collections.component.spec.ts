import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatTableModule, MatInputModule, MatSortModule, MatFormFieldModule, MatCheckboxModule } from '@angular/material';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionService } from '../services/collection.service';
import { ManagePublicCollectionsComponent } from './manage-public-collections.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagePublicCollectionsComponent', () => {
  let component: ManagePublicCollectionsComponent;
  let fixture: ComponentFixture<ManagePublicCollectionsComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePublicCollectionsComponent],
      imports: [RouterTestingModule, BrowserModule, BrowserAnimationsModule, HttpModule, MatToolbarModule,
        MatMenuModule, MatIconModule, MatTableModule,
        MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSortModule, MatPaginatorModule,
        OrderModule, MatDialogModule],
      providers: [CollectionService, HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePublicCollectionsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Mat-select trigger should return 2 items for selection', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();
    expect(trigger.childElementCount).toBe(2);
  });

  xit('deleteSelectedCols Button should invoke corresponding method', () => {
    const deleteCol = spyOn(component, 'openDialog');
    fixture.debugElement.query(By.css('#button_alignR')).triggerEventHandler('click', null);
    expect(deleteCol).toHaveBeenCalled();
  });

  it('should check for apply filter keyup event', () => {
    spyOn(component, 'applyFilter');
    fixture.detectChanges();
    const input = debugElement.query(By.css('#filter_data'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilter).toHaveBeenCalled();
  });

});
