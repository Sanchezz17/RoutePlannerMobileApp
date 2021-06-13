import { Meeting } from '../meetings/types';

export interface Route {
    id: number;
    managerScheduleId: number;
    meetings: Meeting[];
    distance: number;
    waitingTime: number;
    finishesAsPreferred: boolean;
}
