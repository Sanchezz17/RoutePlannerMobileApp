import React, {FunctionComponent, useEffect, useState} from 'react';
import {getCurrentUserAsync} from '../authorization/user-api';
import {defaultUser, User} from '../authorization/user';
import {signIn, signOut} from '../authorization/google/auth-state-manager';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {View} from 'react-native';
import styles from './AuthorizeRoute.styles';

export const UserContext = React.createContext<User>(defaultUser);
export const ChangeUserContext = React.createContext<Function | null>(null);
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

  const changeUser = (changedUser: User) => {
    setUser(changedUser);
  };

  const signOutAndClearUser = async () => {
    await signOut();
    setUser(null);
  };

  return user ? (
    <ChangeUserContext.Provider value={changeUser}>
      <SignOutContext.Provider value={signOutAndClearUser}>
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      </SignOutContext.Provider>
    </ChangeUserContext.Provider>
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
