import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRight } from './types';
import {
    addRightToUserThunk,
    deleteUserThunk,
    getCurrentUserThunk,
    getManagersThunk,
    getUsersWithoutRightsThunk,
    updateUserThunk,
} from './thunks';

export interface UsersState {
    currentUser?: User;
    users: { [key: number]: User };
    requests: { [key: number]: User };
    loadingRequests: boolean;
    loadingManagers: boolean;
}

const initialState: UsersState = {
    users: {},
    requests: {},
    loadingRequests: false,
    loadingManagers: false,
};

const usersSlice = createSlice({
    name: 'users',
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
            delete state.requests[userId];
        },
        [getUsersWithoutRightsThunk.pending.type]: (state: UsersState) => {
            state.loadingRequests = true;
        },
        [getUsersWithoutRightsThunk.fulfilled.type]: (
            state: UsersState,
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
        [getManagersThunk.pending.type]: (state: UsersState) => {
            state.loadingManagers = true;
        },
        [getManagersThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<User[]>,
        ) => {
            const managers = action.payload;
            state.users = managers.reduce(function (
                map: { [key: number]: User },
                obj,
            ) {
                map[obj.id] = obj;
                return map;
            },
            {});
            state.loadingManagers = false;
        },
        [addRightToUserThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<UserRight>,
        ) => {
            const userRight = action.payload;
            delete state.requests[userRight.userId];

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
