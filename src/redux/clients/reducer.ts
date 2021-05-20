import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import createMap from '../../common/utils/createMap';
import {
    deleteClientThunk,
    getClientsThunk,
    getMoreClientsThunk,
    updateClientThunk,
} from './thunks';
import { Client } from './types';

export interface ClientsState {
    clients: { [key: number]: Client };
    loadingClients: boolean;
}

const initialState: ClientsState = {
    clients: {},
    loadingClients: false,
};

const clientsSlice = createSlice({
    name: 'clientsSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [updateClientThunk.fulfilled.type]: (
            state: ClientsState,
            action: PayloadAction<Client>,
        ) => {
            const client = action.payload;
            state.clients[client.id] = client;
        },
        [deleteClientThunk.fulfilled.type]: (
            state: ClientsState,
            action: PayloadAction<number>,
        ) => {
            const clientId = action.payload;
            delete state.clients[clientId];
        },
        [getClientsThunk.pending.type]: (state: ClientsState) => {
            state.loadingClients = true;
        },
        [getClientsThunk.fulfilled.type]: (
            state: ClientsState,
            action: PayloadAction<Client[]>,
        ) => {
            const clients = action.payload;
            state.clients = createMap(clients);
            state.loadingClients = false;
        },
        [getMoreClientsThunk.pending.type]: (state: ClientsState) => {
            state.loadingClients = true;
        },
        [getMoreClientsThunk.fulfilled.type]: (
            state: ClientsState,
            action: PayloadAction<Client[]>,
        ) => {
            const extraClients = action.payload;
            const extraClientsMap = createMap(extraClients);
            state.clients = { ...state.clients, ...extraClientsMap };
            state.loadingClients = false;
        },
    },
});

export default clientsSlice.reducer;
