import { Coordinate } from '../users/types';

export interface Client {
    id: number;
    name: string;
    email: string;
    mobilePhone: string;
    telegram: string;
    coordinate: Coordinate;
}
