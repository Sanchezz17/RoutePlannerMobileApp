import {
    getStartOfNextWeek,
    getStartOfWeek,
} from '../../common/utils/dateUtils';
import { RootState } from '../store';
import { ManagerSchedule } from './types';

export const selectLoadingSchedule = (state: RootState): boolean =>
    state.scheduleSlice.loadingSchedule;

export const selectManagerSchedule = (
    state: RootState,
    managerId: number,
    weekDate: Date,
) => {
    const allManagerSchedule: ManagerSchedule[] = Object.values(
        state.scheduleSlice.schedule[managerId] ?? {},
    );
    const result: ManagerSchedule[] = [];
    for (let day = 0; day < 7; day++) {
        result.push({
            endCoordinate: { address: '', longitude: 0, latitude: 0 },
            endTime: new Date(),
            id: 0,
            startCoordinate: { address: '', longitude: 0, latitude: 0 },
            startTime: new Date(),
            userId: managerId,
        });
    }
    const startOfWeek = getStartOfWeek(weekDate);
    const startOfNextWeek = getStartOfNextWeek(weekDate);
    const fetchedSchedules = allManagerSchedule.filter(
        (managerSchedule) =>
            new Date(managerSchedule.startTime).getTime() >=
                startOfWeek.getTime() &&
            new Date(managerSchedule.startTime).getTime() <
                startOfNextWeek.getTime(),
    );

    for (let schedule of fetchedSchedules) {
        let day = new Date(schedule.startTime).getDay();
        if (day === 0) {
            day = 7;
        }
        result[day - 1] = schedule;
        console.log(`day ${day}`);
        console.log(`schedule ${JSON.stringify(schedule)}`);
    }
    console.log(result);
    return result;
};
