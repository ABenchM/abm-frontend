import { Component, OnInit } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { Login } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {Global} from '../services/global.service';
@Component({
  selector: 'abm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFailed = false;
  constructor(private login: Login, private router: Router, private global: Global) { }
  model = new Credentials('', '');

  loginOnsuccess(code: Number) {
    if (code === 200) {
      this.global.loggedIn = true;
      this.router.navigateByUrl('/about');
    } else {
      this.loginFailed = true;
    }
  }


  loginForm(form: NgForm) {
    this.login.postLoginForm(this.model)
      .subscribe(
        data => this.loginOnsuccess(data),
        err => {
          console.log('error: ', err);
          this.loginFailed = true;
        });
  }
  ngOnInit() {
  }

}
