import { RootState } from '../store';
import { User } from './types';

export const selectCurrentUser = (state: RootState): number =>
    state.users.currentUser;

export const selectUserById = (state: RootState, userId: number): User =>
    state.users.users[userId];

export const selectRequests = (state: RootState): User[] =>
    Object.values(state.users.requests);

export const selectLoadingRequests = (state: RootState): boolean =>
    state.users.loadingRequests;

export const selectManagers = (state: RootState): User[] =>
    Object.values(state.users.users);

export const selectLoadingManagers = (state: RootState): boolean =>
    state.users.loadingManagers;
