import {AuthConfiguration} from 'react-native-app-auth';

export const Config: AuthConfiguration = {
  issuer: 'http://127.0.0.1:5000',
  clientId: 'native',
  redirectUrl: 'io.identityserver.demo:/oauthredirect',
  scopes: ['openid', 'profile', 'email', 'api', 'offline_access'],
};
