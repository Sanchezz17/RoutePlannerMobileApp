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
    for (let day = 0; day < 5; day++) {
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
            managerSchedule.startTime >= startOfWeek &&
            managerSchedule.startTime < startOfNextWeek,
    );

    for (let schedule of fetchedSchedules) {
        const day = schedule.startTime.getDay();
        result[day - 1] = schedule;
    }
    return result;
};
