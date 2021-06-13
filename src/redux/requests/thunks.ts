import { createAsyncThunk } from '@reduxjs/toolkit';

import { DEFAULT_LIMIT } from '../../common/constants';
import { requestsAPI } from './api';

interface UsersSearchParameters {
    offset?: number;
    limit?: number;
    query?: string;
}

const getRequestsPayloadCreator = async ({
    offset,
    limit,
    query,
}: UsersSearchParameters) => {
    return await requestsAPI.getRequestsAsync(
        offset ?? 0,
        limit ?? DEFAULT_LIMIT,
        query ?? '',
    );
};

export const getRequestsThunk = createAsyncThunk(
    'requests/getRequestsThunkStatus',
    getRequestsPayloadCreator,
);

export const getMoreRequestsThunk = createAsyncThunk(
    'requests/getMoreRequestsThunkStatus',
    getRequestsPayloadCreator,
);
