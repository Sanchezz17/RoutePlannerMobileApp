import { authorizeFetch } from '../../utils/autorize-fetch';
import { prefix } from '../../common/constants';
import { Coordinate, User } from './types';

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

export const userAPI = {
    getCurrentUserAsync,
    updateUserAsync,
};
