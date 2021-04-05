import React, {FunctionComponent, useEffect, useState} from 'react';
import {getCurrentUserAsync} from '../authorization/google/user-api';
import {defaultUser, User} from '../authorization/google/user';
import {signIn, signOut} from '../authorization/google/auth-state-manager';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {View} from 'react-native';
import styles from './AuthorizeRoute.styles';

export const UserContext = React.createContext<User>(defaultUser);
export const SignOutContext = React.createContext<Function | null>(null);

export const AuthorizeRoute: FunctionComponent = ({children}) => {
  // toDo хранить юзера в AsyncStorage
  const [user, setUser] = useState<User | null>(null);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const trySignInSilently = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await getAndSaveUser();
    }
  };

  useEffect(() => {
    trySignInSilently();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInAndSetUser = async () => {
    setIsSigninInProgress(true);
    await signIn();
    await getAndSaveUser();
    setIsSigninInProgress(false);
  };

  const getAndSaveUser = async () => {
    const currentUser = await getCurrentUserAsync();
    setUser(currentUser);
  };

  const signOutAndClearUser = async () => {
    await signOut();
    setUser(null);
  };

  return user ? (
    <SignOutContext.Provider value={signOutAndClearUser}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </SignOutContext.Provider>
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
