import { createAsyncThunk } from '@reduxjs/toolkit';

import { routesApi } from './api';
import { Route } from './types';

export interface GetCurrentRoutePayload {
    managerId: number;
    route: Route;
}

export const getCurrentRouteThunk = createAsyncThunk(
    'routes/getCurrentRouteThunkStatus',
    async (managerId: number): Promise<GetCurrentRoutePayload> => {
        const route = await routesApi.getCurrentRouteAsync(managerId);
        return {
            managerId,
            route,
        };
    },
);
