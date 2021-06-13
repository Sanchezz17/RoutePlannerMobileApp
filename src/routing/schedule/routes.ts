import { ManagerScheduleSerializableDto } from '../../redux/schedule/types';
import { User } from '../../redux/users/types';

export enum ScheduleRoutes {
    Schedule = 'ScheduleScreen',
    AddSchedule = 'AddScheduleScreen',
}

export type ScheduleStackParamList = {
    [ScheduleRoutes.Schedule]: { user: User };
    [ScheduleRoutes.AddSchedule]: {
        dateJson: string;
        schedule: ManagerScheduleSerializableDto;
    };
};
