import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Register } from '../services/register.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'abm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public invalidEmail: boolean;
  public invalidUsername: boolean;
  model = new User('', '', '', '', '', '');
  constructor(private register: Register , private router: Router) {
    this.invalidEmail = false;
  }

  registerForm(form: NgForm) {
    this.register.postRegisterForm(this.model)
      .subscribe(
        data => {
          console.log('success', data);
          this.invalidUsername = this.register.checkUsername;
          if ( this.invalidUsername === false ) {
          this.router.navigateByUrl('/register-success');
          }
      },
        err => console.log('error: ', err)
      );
  }


  checkEmail(email: string) {
    if (email === undefined) { return; }
    const splitEmail = email.split('@');
    if (splitEmail.length !== 2) {
      this.invalidEmail = true;
      } else if (splitEmail[0].length < 1 || splitEmail[1].length < 1) {
      this.invalidEmail = true;
    } else if (splitEmail[1].indexOf('.') < 1 || splitEmail[1].lastIndexOf('.') === (splitEmail[1].length - 1)) {
      this.invalidEmail = true;
    } else {
      this.invalidEmail = false;
    }

  }


  ngOnInit() {
  }

  resetUsername() {
    this.invalidUsername = false;
  }

}
