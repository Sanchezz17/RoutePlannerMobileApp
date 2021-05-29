import { ManagerSchedule } from '../../redux/schedule/types';

export enum ScheduleRoutes {
    Schedule = 'ScheduleScreen',
    AddSchedule = 'AddScheduleScreen',
}

export type ScheduleStackParamList = {
    [ScheduleRoutes.Schedule]: undefined;
    [ScheduleRoutes.AddSchedule]: {
        date: Date;
        schedule: ManagerSchedule;
        userId: number;
    };
};