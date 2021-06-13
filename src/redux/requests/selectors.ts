import { RootState } from '../store';
import { User } from '../users/types';

export const selectRequests = (state: RootState): User[] =>
    Object.values(state.requestsSlice.requests);

export const selectLoadingRequests = (state: RootState): boolean =>
    state.requestsSlice.loadingRequests;
