import React from 'react';
import {StatusBar} from 'react-native';
import {AuthorizeRoute} from '../../common/authorization/identity-server/AuthorizeRoute';
import {MainScreen} from '../MainScreen/MainScreen';

const App = () => {
  return (
    <AuthorizeRoute>
      <StatusBar barStyle="dark-content" />
      <MainScreen />
    </AuthorizeRoute>
  );
};

export default App;
