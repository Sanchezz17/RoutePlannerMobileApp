import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AddClientScreen } from '../../screens/AddClientScreen/AddClientScreen';
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
            options={{
                title: 'Добавление клиента',
                headerShown: true,
            }}
        />
    </Stack.Navigator>
);

export default ClientsNavigation;
