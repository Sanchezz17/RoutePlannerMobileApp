import { Coordinate } from '../users/types';

export interface ManagerSchedule {
    id: number;
    userId: number;
    startTime: Date;
    endTime: Date;
    startCoordinate: Coordinate;
    endCoordinate: Coordinate;
}

export interface ManagerScheduleSerializableDto {
    id: number;
    userId: number;
    startTimeJson: string;
    endTimeJson: string;
    startCoordinate: Coordinate;
    endCoordinate: Coordinate;
}

export interface CreateManagerScheduleDto {
    userId: number;
    startTime: Date;
    endTime: Date;
    startCoordinate: Coordinate;
    endCoordinate: Coordinate;
}
