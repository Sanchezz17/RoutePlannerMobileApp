import { RootState } from '../store';
import { User } from './types';

export const selectCurrentUserId = (state: RootState): number =>
    state.users.currentUserId;

export const selectUserById = (state: RootState, userId: number): User =>
    state.users.users[userId];

export const selectCurrentUser = (state: RootState): User =>
    selectUserById(state, selectCurrentUserId(state));

export const selectRequests = (state: RootState): User[] =>
    Object.values(state.users.requests);

export const selectManagers = (state: RootState): User[] =>
    Object.values(state.users.managers);
