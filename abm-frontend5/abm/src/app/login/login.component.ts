import { Component, OnInit , Input } from '@angular/core';
import { Credentials } from '../models/credentials.model';
import { Login } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../services/global.service';
import { GoogleLoginService } from '../services/google-login.service';
@Component({
  selector: 'abm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ngForm: NgForm;
  public loginFailed = false;
  model = new Credentials('', '');
  google_username = 'google-oauth';
  constructor(private login: Login, private router: Router,
        private googleLoginService: GoogleLoginService , private route: ActivatedRoute) { }
  loginOnsuccess(response) {
    if (response.status === 200) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentUser', this.model.username);
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([ returnUrl || '/']);

    } else {
      this.loginFailed = true;
    }
  }
  private loginReq(cred: Credentials) {
       this.login.postLoginForm(cred)
      .subscribe(
        data => this.loginOnsuccess(data),
        err => {
          console.log('error: ', err);
          this.loginFailed = true;
        });
  }

  loginForm() {
    this.loginReq(this.model);
    return this.loginFailed;
  }

  loginGoogle() {
    this.googleLoginService.signinWithGoogle().then(data => {
        this.loginReq(new Credentials(this.google_username, data.idToken));
    });
  }
  ngOnInit() {
  }

}
