import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AddMeetingScreen } from '../../screens/AddMeetingScreen/AddMeetingScreen';
import { MeetingsScreen } from '../../screens/MeetingsScreen/MeetingsScreen';
import { MeetingsRoutes } from './routes';

const Stack = createStackNavigator();

const MeetingsNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={MeetingsRoutes.Meetings}
            component={MeetingsScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={MeetingsRoutes.AddMeeting}
            component={AddMeetingScreen}
            options={{
                title: 'Редактирование встречи',
                headerShown: true,
            }}
        />
    </Stack.Navigator>
);

export default MeetingsNavigation;
