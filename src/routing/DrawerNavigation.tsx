import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { DrawerContent } from '../containers/DrawerContent/DrawerContent';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { OptionsScreen } from '../screens/OptionsScreen/OptionsScreen';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <NavigationContainer theme={DefaultTheme}>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Главная' }}
                />
                <Drawer.Screen
                    name="Options"
                    component={OptionsScreen}
                    options={{ title: 'Настройки' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;
