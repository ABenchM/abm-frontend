import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
@Injectable()
export class GoogleLoginService {

  constructor(private socialAuthService: AuthService) { }
  public signinWithGoogle() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

  return  this.socialAuthService.signIn(socialPlatformProvider)
    .then(this.onSuccess).catch(this.onFailure);
  }
  private onSuccess(data) {
    return data;
  }
  private onFailure(err) {
    console.log('Failed to login to google');
  }
}
