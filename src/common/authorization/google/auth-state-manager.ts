import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Config} from './config';

GoogleSignin.configure(Config);
console.log(`configured with config ${JSON.stringify(Config)}`);

export const signIn = async () => {
  try {
    console.log('kek');
    const hasPlay = await GoogleSignin.hasPlayServices();
    console.log(hasPlay);
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('playServicesNotAvailable');
    } else {
      console.log(error);
      console.log('unknown error');
      throw error;
      // some other error happened
    }
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  console.log(currentUser);
  return currentUser;
};

export const getTokens = async () => {
  const tokens = await GoogleSignin.getTokens();
  console.log(tokens);
  return tokens;
};
