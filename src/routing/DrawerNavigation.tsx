import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { DrawerContent } from '../containers/DrawerContent/DrawerContent';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { OptionsScreen } from '../screens/OptionsScreen/OptionsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerRoutes } from './routes';
import { RequestsScreen } from '../screens/RequestsScreen/RequestsScreen';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/users/selectors';
import { Right } from '../redux/users/types';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const currentUserIsAdmin = currentUser?.rights.includes(Right.Admin);

    return (
        <NavigationContainer theme={DefaultTheme}>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen
                    name={DrawerRoutes.Home}
                    component={HomeScreen}
                    options={{ title: 'Главная' }}
                />
                {currentUserIsAdmin && (
                    <Drawer.Screen
                        name={DrawerRoutes.Requests}
                        component={RequestsScreen}
                        options={{ title: 'Заявки' }}
                    />
                )}
                <Drawer.Screen
                    name={DrawerRoutes.Options}
                    component={OptionsScreen}
                    options={{ title: 'Настройки' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;
