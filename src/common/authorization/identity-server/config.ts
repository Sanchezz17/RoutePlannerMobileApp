import {AuthConfiguration} from 'react-native-app-auth';

export const Config: AuthConfiguration = {
  issuer: 'https://demo.identityserver.io',
  clientId: 'interactive.confidential',
  clientSecret: 'secret',
  redirectUrl: 'io.identityserver.demo:/oauthredirect',
  scopes: ['openid', 'profile', 'email', 'api', 'offline_access'],
};
