import { Meeting } from '../meetings/types';

export interface Route {
    id: number;
    suitableMeetings: Meeting[];
    distance: number;
    waitingTime: number;
    finishesAsPreferred: boolean;
}
