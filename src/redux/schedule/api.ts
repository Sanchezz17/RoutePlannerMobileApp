import { prefix } from '../../common/constants';
import { authorizeFetch } from '../../common/utils/autorizeFetch';
import { Coordinate } from '../users/types';
import { ManagerSchedule } from './types';

const scheduleApiPrefix = `${prefix}/schedule`;

export interface UpdateManagerScheduleDto {
    startTime: Date;
    endTime: Date;
    startCoordinate: Coordinate;
    endCoordinate: Coordinate;
}

const getManagerScheduleForWeekAsync = async (
    managerId?: number,
    weekDate?: Date,
): Promise<ManagerSchedule[]> => {
    return await authorizeFetch(
        `${scheduleApiPrefix}?managerId=${managerId}&weekDate=${weekDate}`,
    );
};

const createManagerScheduleAsync = async (
    managerSchedule: ManagerSchedule,
): Promise<ManagerSchedule> => {
    return await authorizeFetch(`${scheduleApiPrefix}`, {
        method: 'POST',
        body: JSON.stringify(managerSchedule),
    });
};

const updateManagerScheduleAsync = async (
    id: number,
    updateManagerScheduleDto: UpdateManagerScheduleDto,
): Promise<ManagerSchedule> => {
    return await authorizeFetch(`${scheduleApiPrefix}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateManagerScheduleDto),
    });
};

const deleteManagerScheduleAsync = async (id: number): Promise<number> => {
    return await authorizeFetch(`${scheduleApiPrefix}/${id}`, {
        method: 'DELETE',
    });
};

export const scheduleApi = {
    getManagerScheduleForWeekAsync,
    createManagerScheduleAsync,
    updateManagerScheduleAsync,
    deleteManagerScheduleAsync,
};
