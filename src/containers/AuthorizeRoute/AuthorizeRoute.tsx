import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { View } from 'react-native';

import {
    signIn,
    trySignInSilently,
} from '../../common/authorization/google/authStateManager';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/users/selectors';
import { getCurrentUserThunk } from '../../redux/users/thunks';
import styles from './AuthorizeRoute.styles';

export const AuthorizeRoute: FunctionComponent = ({ children }) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);

    const [isSigninInProgress, setIsSigninInProgress] = useState(false);

    const signInSilentlyIfPossible = async () => {
        setIsSigninInProgress(true);
        const isSignedIn = await trySignInSilently();
        console.log(`signed in: ${isSignedIn}`);
        if (isSignedIn) {
            dispatch(getCurrentUserThunk());
        } else {
            setIsSigninInProgress(false);
        }
    };

    useEffect(() => {
        signInSilentlyIfPossible();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentUser) {
            setIsSigninInProgress(false);
        }
    }, [currentUser]);

    const signInAndSetUser = async () => {
        setIsSigninInProgress(true);
        await signIn();
        dispatch(getCurrentUserThunk());
        setIsSigninInProgress(false);
    };

    return currentUser ? (
        <>{children}</>
    ) : (
        <View style={styles.view}>
            <GoogleSigninButton
                style={styles.signInButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInAndSetUser}
                disabled={isSigninInProgress}
            />
        </View>
    );
};
