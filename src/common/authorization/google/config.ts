import {ConfigureParams} from '@react-native-community/google-signin';

export const Config: ConfigureParams = {
  scopes: [], // default is email and profile
  webClientId:
    '', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`
};
