import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AddClientScreen } from '../../screens/AddClientScreen/AddClientScreen';
import { AddMeetingScreen } from '../../screens/AddMeetingScreen/AddMeetingScreen';
import { ClientsScreen } from '../../screens/ClientsScreen/ClientsScreen';
import { ClientsRoutes } from './routes';

const Stack = createStackNavigator();

const ClientsNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={ClientsRoutes.Clients}
            component={ClientsScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name={ClientsRoutes.AddClient}
            component={AddClientScreen}
            options={({ route }) => {
                const title =
                    (route?.params as any).client === undefined
                        ? 'Добавление клиента'
                        : 'Редактирование клиента';
                return {
                    title: title,
                    headerShown: true,
                };
            }}
        />
        <Stack.Screen
            name={ClientsRoutes.AddMeeting}
            component={AddMeetingScreen}
            options={{
                title: 'Назначение встречи',
                headerShown: true,
            }}
        />
    </Stack.Navigator>
);

export default ClientsNavigation;
