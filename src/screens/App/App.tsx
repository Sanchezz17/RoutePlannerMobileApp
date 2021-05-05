import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AuthorizeRoute } from '../../containers/AuthorizeRoute/AuthorizeRoute';
import store from '../../redux/store';
import DrawerNavigation from '../../containers/DrawerNavigation/DrawerNavigation';

const App = () => {
    return (
        <Provider store={store}>
            <AuthorizeRoute>
                <StatusBar barStyle="dark-content" />
                <DrawerNavigation />
            </AuthorizeRoute>
        </Provider>
    );
};

export default App;
