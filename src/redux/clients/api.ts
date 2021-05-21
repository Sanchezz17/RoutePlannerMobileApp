import { prefix } from '../../common/constants';
import { authorizeFetch } from '../../common/utils/autorizeFetch';
import { Coordinate } from '../users/types';
import { Client } from './types';

const clientsApiPrefix = `${prefix}/clients`;

export interface UpdateClientDto {
    name: string;
    email: string;
    mobilePhone: string;
    telegram: string;
    coordinate: Coordinate;
}

const createClientAsync = async (client: Client): Promise<number> => {
    return await authorizeFetch(`${clientsApiPrefix}`, {
        method: 'POST',
        body: JSON.stringify(client),
    });
};

const updateClientAsync = async (
    id: number,
    updateDto: UpdateClientDto,
): Promise<Client> => {
    return await authorizeFetch(`${clientsApiPrefix}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateDto),
    });
};

const deleteClientAsync = async (id: number): Promise<number> => {
    return await authorizeFetch(`${clientsApiPrefix}/${id}`, {
        method: 'DELETE',
    });
};

const getClientsAsync = async (
    offset: number,
    limit: number,
    query: string,
): Promise<Client[]> => {
    return await authorizeFetch(
        `${clientsApiPrefix}/?offset=${offset}&limit=${limit}&query=${query}`,
    );
};

export const clientsAPI = {
    createClientAsync,
    updateClientAsync,
    deleteClientAsync,
    getClients: getClientsAsync,
};
