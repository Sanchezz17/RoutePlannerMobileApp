import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';
import { getCurrentUserThunk, updateUserThunk } from './thunks';

export interface UsersState {
    currentUserId: number;
    users: { [key: number]: User };
}

const initialState: UsersState = {
    currentUserId: 0,
    users: {},
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
    },
});

export const { removeUser } = usersSlice.actions;
export default usersSlice.reducer;
