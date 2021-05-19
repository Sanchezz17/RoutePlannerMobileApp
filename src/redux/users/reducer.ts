import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import createMap from '../../common/utils/createMap';
import {
    addRightToUserThunk,
    deleteUserThunk,
    getCurrentUserThunk,
    getManagersThunk,
    getMoreManagersThunk,
    updateUserThunk,
} from './thunks';
import { User, UserRight } from './types';

export interface UsersState {
    currentUser?: User;
    users: { [key: number]: User };
    loadingManagers: boolean;
}

const initialState: UsersState = {
    users: {},
    loadingManagers: false,
};

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: initialState,
    reducers: { logout: (_: UsersState) => {} },
    extraReducers: {
        [getCurrentUserThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<User>,
        ) => {
            state.currentUser = action.payload;
        },
        [updateUserThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<User>,
        ) => {
            const user = action.payload;
            if (user.id === state.currentUser?.id) {
                state.currentUser = user;
            } else {
                state.users[user.id] = user;
            }
        },
        [deleteUserThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<number>,
        ) => {
            const userId = action.payload;
            delete state.users[userId];
        },
        [getManagersThunk.pending.type]: (state: UsersState) => {
            state.loadingManagers = true;
        },
        [getManagersThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<User[]>,
        ) => {
            const managers = action.payload;
            state.users = createMap(managers);
            state.loadingManagers = false;
        },
        [getMoreManagersThunk.pending.type]: (state: UsersState) => {
            state.loadingManagers = true;
        },
        [getMoreManagersThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<User[]>,
        ) => {
            const extraManagers = action.payload;
            const extraManagersMap = createMap(extraManagers);
            state.users = { ...state.users, ...extraManagersMap };
            state.loadingManagers = false;
        },
        [addRightToUserThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<UserRight>,
        ) => {
            const userRight = action.payload;

            if (state.users[userRight.userId]) {
                state.users[userRight.userId].rights = [
                    ...(state.users[userRight.userId].rights ?? []),
                    userRight.right,
                ];
            }
        },
    },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
