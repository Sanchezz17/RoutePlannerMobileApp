import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import { GetCurrentRoutePayload, getCurrentRouteThunk } from './thunks';
import { Route } from './types';

export interface RoutesState {
    loadingRoute: boolean;
    routes: { [key: number]: Route };
}

const initialState: RoutesState = {
    loadingRoute: false,
    routes: {},
};

const routesSlice = createSlice({
    name: 'routesSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getCurrentRouteThunk.pending.type]: (state: RoutesState) => {
            state.loadingRoute = true;
        },
        [getCurrentRouteThunk.fulfilled.type]: (
            state: RoutesState,
            action: PayloadAction<GetCurrentRoutePayload>,
        ) => {
            const { managerId, route } = action.payload;
            state.routes[managerId] = route;
            state.loadingRoute = false;
        },
        [getCurrentRouteThunk.rejected.type]: (state: RoutesState) => {
            state.loadingRoute = false;
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при загрузке маршрута',
                visibilityTime: 1500,
            });
        },
    },
});

export default routesSlice.reducer;
