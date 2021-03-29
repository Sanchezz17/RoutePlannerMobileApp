import React, {FunctionComponent, useState} from 'react';
import {getCurrentUserAsync} from '../authorization/google/user-manager';
import {defaultUser, User} from '../authorization/google/user';
import {signIn} from '../authorization/google/auth-state-manager';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {View} from 'react-native';

export const UserContext = React.createContext<User>(defaultUser);

export const AuthorizeRoute: FunctionComponent = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const signInAndSetUser = async () => {
    setIsSigninInProgress(true);
    await signIn();
    const currentUser = await getCurrentUserAsync();
    setUser(currentUser);
    setIsSigninInProgress(false);
  };

  return user ? (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  ) : (
    <View style={{display: 'flex', justifyContent: 'center'}}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInAndSetUser}
        disabled={isSigninInProgress}
      />
    </View>
  );
};
