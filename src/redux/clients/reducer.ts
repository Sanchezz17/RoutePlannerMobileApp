import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import createMap from '../../common/utils/createMap';
import {
    createClientThunk,
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
        [createClientThunk.fulfilled.type]: (
            state: ClientsState,
            action: PayloadAction<Client>,
        ) => {
            const client = action.payload;
            state.clients[client.id] = client;
        },
        [createClientThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при создании клиента',
                visibilityTime: 1500,
            });
        },
        [updateClientThunk.fulfilled.type]: (
            state: ClientsState,
            action: PayloadAction<Client>,
        ) => {
            const client = action.payload;
            state.clients[client.id] = client;
        },
        [updateClientThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при обновлении клиента',
                visibilityTime: 1500,
            });
        },
        [deleteClientThunk.fulfilled.type]: (
            state: ClientsState,
            action: PayloadAction<number>,
        ) => {
            const clientId = action.payload;
            delete state.clients[clientId];
        },
        [deleteClientThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при удалении клиента',
                visibilityTime: 1500,
            });
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
        [getClientsThunk.rejected.type]: (state: ClientsState) => {
            state.loadingClients = false;
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при загрузке клиентов',
                visibilityTime: 1500,
            });
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
        [getMoreClientsThunk.rejected.type]: (state: ClientsState) => {
            state.loadingClients = false;
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при загрузке клиентов',
                visibilityTime: 1500,
            });
        },
    },
});

export default clientsSlice.reducer;
