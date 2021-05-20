import { RootState } from '../store';
import { Client } from './types';

export const selectClients = (state: RootState): Client[] =>
    Object.values(state.clientsSlice.clients);

export const selectLoadingClients = (state: RootState): boolean =>
    state.clientsSlice.loadingClients;
