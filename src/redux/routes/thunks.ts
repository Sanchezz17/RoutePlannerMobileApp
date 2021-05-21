import { createAsyncThunk } from '@reduxjs/toolkit';

import { routesApi } from './api';

export const getCurrentRouteThunk = createAsyncThunk(
    'routes/getCurrentRouteThunkStatus',
    async (managerId: number) => {
        return await routesApi.getCurrentRouteAsync(managerId);
    },
);
