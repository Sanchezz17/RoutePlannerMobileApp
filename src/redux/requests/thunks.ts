import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestsAPI } from './api';

interface UsersSearchParameters {
    offset: number;
    limit: number;
    query: string;
}

const getRequestsPayloadCreator = async ({
    offset,
    limit,
    query,
}: UsersSearchParameters) => {
    return await requestsAPI.getRequestsAsync(offset, limit, query);
};

export const getRequestsThunk = createAsyncThunk(
    'requests/getRequestsThunkStatus',
    getRequestsPayloadCreator,
);

export const getMoreRequestsThunk = createAsyncThunk(
    'requests/getMoreRequestsThunkStatus',
    getRequestsPayloadCreator,
);
