import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import createMap from '../../common/utils/createMap';
import { deleteUserThunk } from '../users/thunks';
import { User } from '../users/types';
import { getMoreRequestsThunk, getRequestsThunk } from './thunks';

export interface RequestsState {
    requests: { [key: number]: User };
    loadingRequests: boolean;
}

const initialState: RequestsState = {
    requests: {},
    loadingRequests: false,
};

const deleteRequestByIdHandler = (
    state: RequestsState,
    action: PayloadAction<number>,
) => {
    const userId = action.payload;
    delete state.requests[userId];
};

const requestsSlice = createSlice({
    name: 'requestsSlice',
    initialState: initialState,
    reducers: {
        acceptRequest: deleteRequestByIdHandler,
    },
    extraReducers: {
        [deleteUserThunk.fulfilled.type]: deleteRequestByIdHandler,
        [getRequestsThunk.pending.type]: (state: RequestsState) => {
            state.loadingRequests = true;
        },
        [getRequestsThunk.fulfilled.type]: (
            state: RequestsState,
            action: PayloadAction<User[]>,
        ) => {
            const requests = action.payload;
            state.requests = createMap(requests);
            state.loadingRequests = false;
        },
        [getMoreRequestsThunk.pending.type]: (state: RequestsState) => {
            state.loadingRequests = true;
        },
        [getMoreRequestsThunk.fulfilled.type]: (
            state: RequestsState,
            action: PayloadAction<User[]>,
        ) => {
            const extraRequests = action.payload;
            const extraRequestsMap = createMap(extraRequests);
            state.requests = { ...state.requests, ...extraRequestsMap };
            state.loadingRequests = false;
        },
    },
});

export const { acceptRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
