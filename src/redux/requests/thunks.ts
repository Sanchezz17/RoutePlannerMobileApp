import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestsAPI } from './api';

interface UsersSearchParameters {
    offset: number;
    limit: number;
    query: string;
}

export const getRequestsThunk = createAsyncThunk(
    'users/getRequestsThunkStatus',
    async ({ offset, limit, query }: UsersSearchParameters, __) => {
        return await requestsAPI.getRequestsAsync(offset, limit, query);
    },
);
