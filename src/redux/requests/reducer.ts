import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRequestsThunk } from './thunks';
import { User } from '../users/types';
import { deleteUserThunk } from '../users/thunks';

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
            const usersWithoutRights = action.payload;
            state.requests = usersWithoutRights.reduce(function (
                map: { [key: number]: User },
                obj,
            ) {
                map[obj.id] = obj;
                return map;
            },
            {});
            state.loadingRequests = false;
        },
    },
});

export const { acceptRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
