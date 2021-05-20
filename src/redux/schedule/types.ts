import { Coordinate } from '../users/types';

export interface ManagerSchedule {
    id: number;
    userId: number;
    startTime: Date;
    endTime: Date;
    startCoordinate: Coordinate;
    endCoordinate: Coordinate;
}
