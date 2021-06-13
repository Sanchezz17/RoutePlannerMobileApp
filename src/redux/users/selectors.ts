import { RootState } from '../store';
import { User } from './types';

export const selectCurrentUser = (state: RootState): User =>
    state.usersSlice.currentUser;

export const selectUserById = (state: RootState, userId: number): User =>
    state.usersSlice.users[userId];

export const selectManagers = (state: RootState): User[] =>
    Object.values(state.usersSlice.users);

export const selectLoadingManagers = (state: RootState): boolean =>
    state.usersSlice.loadingManagers;
