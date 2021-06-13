import { Client } from '../clients/types';
import { Coordinate } from '../users/types';

export interface Meeting {
    id: number;
    clientId: number;
    availableTimeStart: Date;
    availableTimeEnd: Date;
    startTime: Date;
    endTime: Date;
    durationInMinutes: number;
    coordinate: Coordinate;
    client: Client;
}
