import { prefix } from '../../common/constants';
import { authorizeFetch } from '../../common/utils/autorizeFetch';
import { Route } from './types';

const routesApiPrefix = `${prefix}/routes`;

const getCurrentRouteAsync = async (managerId: number): Promise<Route> => {
    return await authorizeFetch(`${routesApiPrefix}?managerId=${managerId}`);
};

export const routesApi = {
    getCurrentRouteAsync,
};
