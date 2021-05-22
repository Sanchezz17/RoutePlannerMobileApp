import { Coordinate, defaultCoordinate } from '../users/types';

export interface Client {
    id: number;
    name: string;
    email: string;
    mobilePhone: string;
    telegram: string;
    coordinate: Coordinate;
}

export const defaultClient: Client = {
    id: 0,
    name: '',
    email: '',
    telegram: '',
    mobilePhone: '',
    coordinate: defaultCoordinate,
};
