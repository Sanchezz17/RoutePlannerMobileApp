import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthorizeRoute} from '../common/components/AuthorizeRoute';
import {HomeScreen} from './HomeScreen/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {OptionsScreen} from './OptionsScreen/OptionsScreen';

export type RootStackParamList = {
  Home: undefined;
  Options: {userName: string};
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthorizeRoute>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={HomeScreen}
            options={{title: 'Главная'}}
          />
          <Stack.Screen
            name="Options"
            component={OptionsScreen}
            options={{title: 'Настройки'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthorizeRoute>
  );
};

export default App;
