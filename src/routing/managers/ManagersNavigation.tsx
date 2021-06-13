import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ManagersScreen } from '../../screens/ManagersScreen/ManagersScreen';
import { OptionsScreen } from '../../screens/OptionsScreen/OptionsScreen';
import { RouteScreen } from '../../screens/RouteScreen/RouteScreen';
import { ScheduleScreen } from '../../screens/ScheduleScreen/ScheduleScreen';
import { ManagersRoutes } from './routes';

const Stack = createStackNavigator();

const ManagersNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={ManagersRoutes.Managers}
            component={ManagersScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={ManagersRoutes.Options}
            component={OptionsScreen}
            options={{
                title: 'Настройки менеджера',
                headerShown: true,
            }}
        />
        <Stack.Screen
            name={ManagersRoutes.Schedule}
            component={ScheduleScreen}
            options={{
                title: 'График менеджера',
                headerShown: true,
            }}
        />
        <Stack.Screen
            name={ManagersRoutes.Route}
            component={RouteScreen}
            options={{
                title: 'Маршрут менеджера',
                headerShown: true,
            }}
        />
    </Stack.Navigator>
);

export default ManagersNavigation;
