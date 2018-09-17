import { TestBed, inject } from '@angular/core/testing';
import { GoogleLoginService } from './google-login.service';
import { Http, HttpModule} from '@angular/http';
import { AuthService, SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { getAuthServiceConfigs } from '../SocialLoginConfig';

describe('GoogleLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, SocialLoginModule],
      providers: [GoogleLoginService , SocialLoginModule, AuthService , {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }]
    });
  });

  fit('should be created', inject([GoogleLoginService], (service: GoogleLoginService) => {
    expect(service).toBeTruthy();
  }));
});
