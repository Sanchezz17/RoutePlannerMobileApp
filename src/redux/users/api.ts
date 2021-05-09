import { authorizeFetch } from '../../common/utils/autorize-fetch';
import { prefix } from '../../common/constants';
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

const getUsersWithoutRightsAsync = async (): Promise<User[]> => {
    return await authorizeFetch(`${usersApiPrefix}/without-rights`);
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
    getUsersWithoutRightsAsync,
    addRightToUserAsync,
};
