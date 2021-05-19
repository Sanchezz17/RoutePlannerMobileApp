import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import { AuthorizeRoute } from '../../containers/AuthorizeRoute/AuthorizeRoute';
import store from '../../redux/store';
import DrawerNavigation from '../../routing/main/DrawerNavigation';

const App = () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <AuthorizeRoute>
                    <StatusBar barStyle="dark-content" />
                    <DrawerNavigation />
                </AuthorizeRoute>
            </PaperProvider>
        </StoreProvider>
    );
};

export default App;
