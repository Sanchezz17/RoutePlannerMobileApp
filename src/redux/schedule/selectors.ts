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
    const startOfWeek = getStartOfWeek(weekDate);
    const startOfNextWeek = getStartOfNextWeek(weekDate);
    return allManagerSchedule
        .filter(
            (managerSchedule) =>
                managerSchedule.startTime >= startOfWeek &&
                managerSchedule.startTime < startOfNextWeek,
        )
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
};
