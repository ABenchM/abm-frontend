import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
@Component({
  selector: 'abm-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService) {
    this.signinWithGoogle();
  }

  ngOnInit() {
  }
  public signinWithGoogle() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData.idToken);
      }
    );
  }
}
