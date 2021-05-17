import { authorizeFetch } from '../../common/utils/autorizeFetch';
import { prefix } from '../../common/constants';
import { User } from '../users/types';

const requestsApiPrefix = `${prefix}/users`;

const getRequestsAsync = async (
    offset: number,
    limit: number,
    query: string,
): Promise<User[]> => {
    return await authorizeFetch(
        `${requestsApiPrefix}/without-rights?offset=${offset}&limit=${limit}&query=${query}`,
    );
};

export const requestsAPI = {
    getRequestsAsync,
};
