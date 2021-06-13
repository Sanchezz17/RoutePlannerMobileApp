import { createAsyncThunk } from '@reduxjs/toolkit';

import { Meeting } from '../meetings/types';
import { routesApi } from './api';
import { Route } from './types';

export interface GetCurrentRoutePayload {
    managerId: number;
    route: Route;
}
export interface RouteSearchParameters {
    managerId?: number;
}
export const getCurrentRouteThunk = createAsyncThunk(
    'routes/getCurrentRouteThunkStatus',
    async ({
        managerId,
    }: RouteSearchParameters): Promise<GetCurrentRoutePayload> => {
        const route = await routesApi.getCurrentRouteAsync(managerId);
        return {
            managerId: managerId ?? 0,
            route,
        };
    },
);

export const getCurrentRouteMeetingsThunk = createAsyncThunk(
    'routes/getCurrentRouteMeetingsThunkStatus',
    async ({ managerId }: RouteSearchParameters): Promise<Meeting[]> => {
        const route = await routesApi.getCurrentRouteAsync(managerId);
        return route.meetings;
    },
);
