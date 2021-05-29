import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    DefaultTheme,
    getFocusedRouteNameFromRoute,
    NavigationContainer,
} from '@react-navigation/native';
import React from 'react';

import ClientsIcon from '../../components/icons/Drawer/ClientsIcon';
import ManagersIcon from '../../components/icons/Drawer/ManagersIcon';
import MeetingsIcon from '../../components/icons/Drawer/MeetingsIcon';
import RequestsIcon from '../../components/icons/Drawer/RequestsIcon';
import RouteIcon from '../../components/icons/Drawer/RouteIcon';
import ScheduleIcon from '../../components/icons/Drawer/ScheduleIcon';
import SettingsIcon from '../../components/icons/Drawer/SettingsIcon';
import { DrawerContent } from '../../containers/DrawerContent/DrawerContent';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/users/selectors';
import { hasUserRight, Right } from '../../redux/users/types';
import { HomeScreen } from '../../screens/HomeScreen/HomeScreen';
import { OptionsScreen } from '../../screens/OptionsScreen/OptionsScreen';
import { RequestsScreen } from '../../screens/RequestsScreen/RequestsScreen';
import { RouteScreen } from '../../screens/RouteScreen/RouteScreen';
import ClientsNavigation from '../clients/ClientsNavigation';
import { ClientsRoutes } from '../clients/routes';
import ManagersNavigation from '../managers/ManagersNavigation';
import { ManagersRoutes } from '../managers/routes';
import MeetingsNavigation from '../meetings/MeetingsNavigation';
import { MeetingsRoutes } from '../meetings/routes';
import { ScheduleRoutes } from '../schedule/routes';
import ScheduleNavigation from '../schedule/ScheduleNavigation';
import { DrawerRoutes } from './routes';

const Drawer = createDrawerNavigator();
const ScreensWithHiddenHeader: string[] = [
    ClientsRoutes.AddClient,
    MeetingsRoutes.AddMeeting,
    ManagersRoutes.Options,
    ManagersRoutes.CurrentUserOptions,
    ScheduleRoutes.AddSchedule,
];
const DrawerNavigation = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const currentUserIsAdmin = hasUserRight(currentUser, Right.Admin);
    const currentUserIsManager = hasUserRight(currentUser, Right.Manager);
    // @ts-ignore
    const shouldShowHeader = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        return !ScreensWithHiddenHeader.includes(routeName);
    };

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
                {currentUserIsManager && (
                    <Drawer.Screen
                        name={DrawerRoutes.Schedule}
                        component={ScheduleNavigation}
                        options={({ route }) => ({
                            title: 'График',
                            drawerIcon: ({ focused }) => (
                                <ScheduleIcon focused={focused} />
                            ),
                            headerShown: shouldShowHeader(route),
                        })}
                    />
                )}
                {currentUserIsManager && (
                    <Drawer.Screen
                        name={DrawerRoutes.Route}
                        component={RouteScreen}
                        options={{
                            title: 'Маршрут',
                            drawerIcon: ({ focused }) => (
                                <RouteIcon focused={focused} />
                            ),
                            headerShown: true,
                        }}
                    />
                )}
                {currentUserIsAdmin && (
                    <Drawer.Screen
                        name={DrawerRoutes.Managers}
                        component={ManagersNavigation}
                        options={({ route }) => ({
                            title: 'Менеджеры',
                            drawerIcon: ({ focused }) => (
                                <ManagersIcon focused={focused} />
                            ),
                            headerShown: shouldShowHeader(route),
                        })}
                    />
                )}
                {(currentUserIsManager || currentUserIsAdmin) && (
                    <Drawer.Screen
                        name={DrawerRoutes.Clients}
                        component={ClientsNavigation}
                        options={({ route }) => ({
                            title: 'Клиенты',
                            drawerIcon: ({ focused }) => (
                                <ClientsIcon focused={focused} />
                            ),
                            headerShown: shouldShowHeader(route),
                        })}
                    />
                )}
                {currentUserIsAdmin && (
                    <Drawer.Screen
                        name={DrawerRoutes.Meetings}
                        component={MeetingsNavigation}
                        options={({ route }) => ({
                            title: 'Встречи',
                            drawerIcon: ({ focused }) => (
                                <MeetingsIcon focused={focused} />
                            ),
                            headerShown: shouldShowHeader(route),
                        })}
                    />
                )}
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
                {currentUserIsManager && (
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
                )}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;
