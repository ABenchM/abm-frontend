import { Component, OnInit } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { Login } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'abm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: Login, private router: Router) { }
  model = new Credentials('', '');

  loginOnsuccess(code: Number) {
    if (code === 200) {
      this.router.navigateByUrl('/about');
    } else {
      console.log('Invalid Username or password');
    }
  }


  loginForm(form: NgForm) {
    this.login.postLoginForm(this.model)
      .subscribe(
        data => this.loginOnsuccess(data),
        err => console.log('error: ', err)
      );
  }
  ngOnInit() {
  }

}
