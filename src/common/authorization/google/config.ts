import {ConfigureParams} from '@react-native-google-signin/google-signin';

export const Config: ConfigureParams = {
  webClientId:
    '', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`
};
