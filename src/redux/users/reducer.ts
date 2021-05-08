import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Right, User, UserRight } from './types';
import {
    getCurrentUserThunk,
    updateUserThunk,
    deleteUserThunk,
    getUsersWithoutRightsThunk,
    addRightToUserThunk,
} from './thunks';

export interface UsersState {
    currentUserId: number;
    users: { [key: number]: User };
    requests: { [key: number]: User };
}

const initialState: UsersState = {
    currentUserId: 0,
    users: {},
    requests: {},
};

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        removeUser: (state: UsersState, action: PayloadAction<number>) => {
            const userId = action.payload;
            delete state.users[userId];
        },
    },
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
        [getUsersWithoutRightsThunk.fulfilled.type]: (
            state: UsersState,
            action: PayloadAction<User[]>,
        ) => {
            const usersWithoutRights = action.payload;
            const requestsMap = usersWithoutRights.reduce(function (
                map: { [key: number]: User },
                obj,
            ) {
                map[obj.id] = obj;
                return map;
            },
            {});
            state.requests = {
                ...state.requests,
                ...requestsMap,
            };
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

export const { removeUser } = usersSlice.actions;
export default usersSlice.reducer;
