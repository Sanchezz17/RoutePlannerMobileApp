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
import SettingsIcon from '../components/icons/SettingsIcon';
import RequestsIcon from '../components/icons/RequestsIcon';
import ManagersIcon from '../components/icons/ManagersIcon';
import ClientsIcon from '../components/icons/ClientsIcon';
import MeetingsIcon from '../components/icons/MeetingsIcon';
import ScheduleIcon from '../components/icons/ScheduleIcon';
import RouteIcon from '../components/icons/RouteIcon';

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
                    }}
                />
                {currentUserIsAdmin && (
                    <Drawer.Screen
                        name={DrawerRoutes.Managers}
                        component={RequestsScreen}
                        options={{
                            title: 'Менеджеры',
                            drawerIcon: ({ focused }) => (
                                <ManagersIcon focused={focused} />
                            ),
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
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;
