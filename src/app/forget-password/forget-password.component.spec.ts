
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ForgetPasswordComponent } from './forget-password.component';
import { ResetPasswordService } from '../services/reset-password.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {of} from 'rxjs';
describe('ForgetPasswordComponent', () => {
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  let mockResetPasswordService;
  let form: NgForm;
 beforeEach(() => {
   mockResetPasswordService = jasmine.createSpyObj(['resetPassword']);
  TestBed.configureTestingModule({
    imports: [FormsModule, RouterTestingModule],
    declarations: [ForgetPasswordComponent],
    providers: [
      {provide: ResetPasswordService, useValue: mockResetPasswordService}
    ],
    schemas: [NO_ERRORS_SCHEMA]


  });
  fixture = TestBed.createComponent(ForgetPasswordComponent);
 });

 fit('should checkspace set cancontainSpace true if username contains space' , () => {

  fixture.componentInstance.checkSpace('ankur ');
  expect(fixture.componentInstance.cannotContainSpace).toBe(true);

 });

 it('should resetPassword have been called with right parameter' , () => {
  // mockResetPasswordService.resetPassword.and.returnValue(of(true));
  spyOn(mockResetPasswordService, 'resetPassword');
  fixture.componentInstance.resetPassword();
  expect(mockResetPasswordService.resetPassword()).toHaveBeenCalled();

 } );

 });
