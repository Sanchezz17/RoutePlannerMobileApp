import React, {FunctionComponent, useEffect, useState} from 'react';
import {getCurrentUserAsync} from '../authorization/identity-server/user-manager';
import {defaultUser, User} from '../authorization/identity-server/user';

export const UserContext = React.createContext<User>(defaultUser);

export const AuthorizeRoute: FunctionComponent = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const currentUser = await getCurrentUserAsync();
    setUser(currentUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    user && <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};
