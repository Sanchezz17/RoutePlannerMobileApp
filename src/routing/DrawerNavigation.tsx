import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';

import ClientsIcon from '../components/icons/ClientsIcon';
import ManagersIcon from '../components/icons/ManagersIcon';
import MeetingsIcon from '../components/icons/MeetingsIcon';
import RequestsIcon from '../components/icons/RequestsIcon';
import RouteIcon from '../components/icons/RouteIcon';
import ScheduleIcon from '../components/icons/ScheduleIcon';
import SettingsIcon from '../components/icons/SettingsIcon';
import { DrawerContent } from '../containers/DrawerContent/DrawerContent';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/users/selectors';
import { Right } from '../redux/users/types';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ManagerScreen } from '../screens/ManagersScreen/ManagersScreen';
import { OptionsScreen } from '../screens/OptionsScreen/OptionsScreen';
import { RequestsScreen } from '../screens/RequestsScreen/RequestsScreen';
import { DrawerRoutes } from './routes';

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
                    options={{
                        title: 'Главная',
                        headerShown: true,
                    }}
                />
                <Drawer.Screen
                    name={DrawerRoutes.Schedule}
                    component={HomeScreen}
                    options={{
                        title: 'График',
                        drawerIcon: ({ focused }) => (
                            <ScheduleIcon focused={focused} />
                        ),
                        headerShown: true,
                    }}
                />
                <Drawer.Screen
                    name={DrawerRoutes.Route}
                    component={HomeScreen}
                    options={{
                        title: 'Маршрут',
                        drawerIcon: ({ focused }) => (
                            <RouteIcon focused={focused} />
                        ),
                        headerShown: true,
                    }}
                />
                {currentUserIsAdmin && (
                    <Drawer.Screen
                        name={DrawerRoutes.Managers}
                        component={ManagerScreen}
                        options={{
                            title: 'Менеджеры',
                            drawerIcon: ({ focused }) => (
                                <ManagersIcon focused={focused} />
                            ),
                            headerShown: true,
                        }}
                    />
                )}
                <Drawer.Screen
                    name={DrawerRoutes.Clients}
                    component={RequestsScreen}
                    options={{
                        title: 'Клиенты',
                        drawerIcon: ({ focused }) => (
                            <ClientsIcon focused={focused} />
                        ),
                        headerShown: true,
                    }}
                />
                <Drawer.Screen
                    name={DrawerRoutes.Meetings}
                    component={RequestsScreen}
                    options={{
                        title: 'Встречи',
                        drawerIcon: ({ focused }) => (
                            <MeetingsIcon focused={focused} />
                        ),
                        headerShown: true,
                    }}
                />
                {currentUserIsAdmin && (
                    <Drawer.Screen
                        name={DrawerRoutes.Requests}
                        component={RequestsScreen}
                        options={{
                            title: 'Заявки',
                            drawerIcon: ({ focused }) => (
                                <RequestsIcon focused={focused} />
                            ),
                            headerShown: true,
                        }}
                    />
                )}
                <Drawer.Screen
                    name={DrawerRoutes.Options}
                    component={OptionsScreen}
                    options={{
                        title: 'Настройки',
                        drawerIcon: ({ focused }) => (
                            <SettingsIcon focused={focused} />
                        ),
                        headerShown: true,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;
