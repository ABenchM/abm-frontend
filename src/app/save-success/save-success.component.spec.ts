import { SaveSuccessComponent } from './save-success.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';


describe('SaveSuccessComponent', () => {
 let fixture: ComponentFixture<SaveSuccessComponent>;
beforeEach(() => {
 TestBed.configureTestingModule({
   declarations: [SaveSuccessComponent],

 });
 fixture = TestBed.createComponent(SaveSuccessComponent);
});

fit('should render the success message under p tag', () => {

  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('p').textContent).toContain('Your details have been saved successfully.');

});

});
