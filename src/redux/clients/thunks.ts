import { createAsyncThunk } from '@reduxjs/toolkit';

import { DEFAULT_LIMIT } from '../../common/constants';
import { clientsAPI, UpdateClientDto } from './api';

export const createClientThunk = createAsyncThunk(
    'clients/createClientThunkStatus',
    async (client: UpdateClientDto) => {
        return await clientsAPI.createClientAsync(client);
    },
);

export const updateClientThunk = createAsyncThunk(
    'clients/updateClientThunkStatus',
    async (updateClientParameters: {
        id: number;
        updateClientDto: UpdateClientDto;
    }) => {
        const { id, updateClientDto } = updateClientParameters;
        return await clientsAPI.updateClientAsync(id, updateClientDto);
    },
);

export const deleteClientThunk = createAsyncThunk(
    'clients/deleteClientThunkStatus',
    async (id: number) => {
        return await clientsAPI.deleteClientAsync(id);
    },
);

export interface ClientsSearchParameters {
    offset?: number;
    limit?: number;
    query?: string;
}

const getClientsPayloadCreator = async ({
    offset,
    limit,
    query,
}: ClientsSearchParameters) => {
    return await clientsAPI.getClients(
        offset ?? 0,
        limit ?? DEFAULT_LIMIT,
        query ?? '',
    );
};

export const getClientsThunk = createAsyncThunk(
    'clients/getClientsThunkStatus',
    getClientsPayloadCreator,
);

export const getMoreClientsThunk = createAsyncThunk(
    'clients/getMoreClientsThunkStatus',
    getClientsPayloadCreator,
);
