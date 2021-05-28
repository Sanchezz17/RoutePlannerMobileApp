import { prefix } from '../../common/constants';
import { authorizeFetch } from '../../common/utils/autorizeFetch';
import { Coordinate, Right, User, UserRight } from './types';

const usersApiPrefix = `${prefix}/users`;

export interface UpdateUserDto {
    mobilePhone: string;
    telegram: string;
    coordinate: Coordinate;
}

const getCurrentUserAsync = async (): Promise<User> => {
    return await authorizeFetch(`${usersApiPrefix}/current`);
};

const updateUserAsync = async (
    id: number,
    updateDto: UpdateUserDto,
): Promise<User> => {
    return await authorizeFetch(`${usersApiPrefix}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateDto),
    });
};

const deleteUserAsync = async (id: number): Promise<number> => {
    return await authorizeFetch(`${usersApiPrefix}/${id}`, {
        method: 'DELETE',
    });
};

const getUsersAsync = async (
    offset: number,
    limit: number,
    query: string,
): Promise<User[]> => {
    return await authorizeFetch(
        `${usersApiPrefix}/with-rights?offset=${offset}&limit=${limit}&query=${query}`,
    );
};

const addRightToUserAsync = async (
    id: number,
    right: Right,
): Promise<UserRight> => {
    return await authorizeFetch(`${usersApiPrefix}/${id}/rights/${right}`, {
        method: 'POST',
    });
};

export const userAPI = {
    getCurrentUserAsync,
    updateUserAsync,
    deleteUserAsync,
    addRightToUserAsync,
    getManagers: getUsersAsync,
};
