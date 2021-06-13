import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { TimedMutex } from 'tstl';

import { Config } from './config';

GoogleSignin.configure(Config);
console.log(`configured with config ${JSON.stringify(Config)}`);

export const signIn = async () => {
    try {
        const hasPlay = await GoogleSignin.hasPlayServices();
        console.log(`HasPlayServices: ${hasPlay}`);
        const userInfo = await GoogleSignin.signIn();
        console.log(`User info: ${JSON.stringify(userInfo)}`);
        return userInfo;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log('cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log('progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play utils not available or outdated
            console.log('playServicesNotAvailable');
        } else {
            console.log(error);
            console.log('unknown error');
            throw error;
            // some other error happened
        }
    }
};

export const trySignInSilently = async () => {
    try {
        await GoogleSignin.signInSilently();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const signOut = async () => {
    try {
        const tokens = await getTokens();
        await GoogleSignin.clearCachedAccessToken(tokens.accessToken);
        await GoogleSignin.signOut();
    } catch (error) {
        console.error(error);
    }
};

const mutex = new TimedMutex();

export const getTokens = async () => {
    await mutex.try_lock_for(3000);
    const tokens = await GoogleSignin.getTokens();
    await mutex.unlock();
    console.log(tokens);
    return tokens;
};
