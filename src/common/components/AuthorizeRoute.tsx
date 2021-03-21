import React, {FunctionComponent, useEffect, useState} from 'react';
import {getCurrentUserAsync} from '../authorization/identity-server/user-manager';
import {defaultUser, User} from '../authorization/identity-server/user';
import {populateAuthStateAsync} from '../authorization/identity-server/auth-state-manager';

export const UserContext = React.createContext<User>(defaultUser);

export const AuthorizeRoute: FunctionComponent = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    await populateAuthStateAsync();
    const currentUser = await getCurrentUserAsync();
    setUser(currentUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  ) : (
    <UserContext.Provider value={defaultUser}>{children}</UserContext.Provider>
  );
};
