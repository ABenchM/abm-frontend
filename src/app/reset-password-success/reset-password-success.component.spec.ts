
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ResetPasswordSuccessComponent } from './reset-password-success.component';

describe('ResetPasswordSuccessComponent', () => {
  let fixture: ComponentFixture<ResetPasswordSuccessComponent>;
 beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ResetPasswordSuccessComponent],

  });
  fixture = TestBed.createComponent(ResetPasswordSuccessComponent);
 });

 fit('should render the success message under p tag', () => {

   fixture.detectChanges();
   expect(fixture.nativeElement.querySelector('p').textContent).toContain('Your password has been updated.');

 });



 });
