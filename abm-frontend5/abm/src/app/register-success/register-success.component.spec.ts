import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RegisterSuccessComponent } from './register-success.component';

fdescribe('RegisterSuccessComponent', () => {
 // let component: RegisterSuccessComponent;
 // let fixture: ComponentFixture<RegisterSuccessComponent>;
  // const de = fixture.debugElement.query(By.css('h2')).nativeElement;
 // let de: DebugElement = fixture.nativeElement.querySelector('h2');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSuccessComponent]
    })
      .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(RegisterSuccessComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  fit('should have a h2 tag of `Thank you for registering!`', () => {
    const fixture = TestBed.createComponent(RegisterSuccessComponent);
    fixture.detectChanges();
    const de = fixture.debugElement.nativeElement;
    expect(de.querySelector('h2').textContent).toContain('Thank you for registering!');
  });

});
