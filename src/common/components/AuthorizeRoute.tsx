import React, {FunctionComponent, useEffect, useState} from 'react';
import {getCurrentUserAsync} from '../authorization/google/user-manager';
import {defaultUser, User} from '../authorization/google/user';
import {signIn, signOut} from '../authorization/google/auth-state-manager';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {View} from 'react-native';

export const UserContext = React.createContext<User>(defaultUser);
export const SignOutContext = React.createContext<Function | null>(null);

export const AuthorizeRoute: FunctionComponent = ({children}) => {
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
    <View
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GoogleSigninButton
        style={{height: '10%'}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInAndSetUser}
        disabled={isSigninInProgress}
      />
    </View>
  );
};
