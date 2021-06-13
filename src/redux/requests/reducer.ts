import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

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
        [deleteUserThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при удалении пользователя',
                visibilityTime: 1500,
            });
        },
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
        [getRequestsThunk.rejected.type]: (state: RequestsState) => {
            state.loadingRequests = false;
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при загрузке заявок',
                visibilityTime: 1500,
            });
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
        [getMoreRequestsThunk.rejected.type]: (state: RequestsState) => {
            state.loadingRequests = false;
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при загрузке заявок',
                visibilityTime: 1500,
            });
        },
    },
});

export const { acceptRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
