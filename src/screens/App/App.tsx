import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StatusBar} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthorizeRoute} from '../../common/components/AuthorizeRoute/AuthorizeRoute';
import {HomeScreen} from '../HomeScreen/HomeScreen';
import {OptionsScreen} from '../OptionsScreen/OptionsScreen';
import {DrawerContent} from './DrawerContent/DrawerContent';

export type RootDrawerParamList = {
  Home: undefined;
  Options: undefined;
};

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <AuthorizeRoute>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer theme={DefaultTheme}>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Главная'}}
          />
          <Drawer.Screen
            name="Options"
            component={OptionsScreen}
            options={{title: 'Настройки'}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthorizeRoute>
  );
};

export default App;
