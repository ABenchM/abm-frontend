import { RegisterSuccessComponent } from './register-success.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('RegisterSuccessComponent', () => {
  let fixture: ComponentFixture<RegisterSuccessComponent>;
 beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [RegisterSuccessComponent],

  });
  fixture = TestBed.createComponent(RegisterSuccessComponent);
 });

 fit('should render the information message under p tag', () => {

   fixture.detectChanges();
   expect(fixture.nativeElement.querySelector('p').textContent).toContain('You will be able to log in once your account is approved.');

 });

 fit('should render the success message under h2 tag', () => {

  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Thank you for registering!');

});

 });
