import { Client } from '../clients/types';
import { Coordinate } from '../users/types';

export interface Meeting {
    id: number;
    clientId: number;
    name: string;
    startTime: Date;
    endTime: Date;
    coordinate: Coordinate;
    client: Client;
}
