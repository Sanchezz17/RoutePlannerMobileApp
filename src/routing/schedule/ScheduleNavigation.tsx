import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AddScheduleScreen } from '../../screens/AddScheduleScreen/AddScheduleScreen';
import { ScheduleScreen } from '../../screens/ScheduleScreen/ScheduleScreen';
import { ScheduleRoutes } from './routes';

const Stack = createStackNavigator();

const ScheduleNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={ScheduleRoutes.Schedule}
            component={ScheduleScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={ScheduleRoutes.AddSchedule}
            component={AddScheduleScreen}
            options={{
                title: 'Редактирование смены',
                headerShown: true,
            }}
        />
    </Stack.Navigator>
);

export default ScheduleNavigation;
