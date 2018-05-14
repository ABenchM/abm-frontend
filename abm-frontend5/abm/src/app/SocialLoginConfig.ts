import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular5-social-login';

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig([{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('1028525994000-2e188qbc7bgpmrdrqp0crfjaavn2o3oo.apps.googleusercontent.com')
    }]);

    return config;
}
