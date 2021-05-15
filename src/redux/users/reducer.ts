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
    currentUserId: number;
    users: { [key: number]: User };
    requests: { [key: number]: User };
    loadingRequests: boolean;
    managers: { [key: number]: User };
    loadingManagers: boolean;
}

const initialState: UsersState = {
    currentUserId: 0,
    users: {},
    requests: {},
    loadingRequests: false,
    managers: {},
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
            const currentUser = action.payload;
            state.currentUserId = currentUser.id;
            state.users[currentUser.id] = currentUser;
        },
        [updateUserThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<User>,
        ) => {
            const user = action.payload;
            state.users[user.id] = user;
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
            state.managers = managers.reduce(function (
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
            console.log(userRight);
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
