import { createAsyncThunk } from '@reduxjs/toolkit';

import { scheduleApi, UpdateManagerScheduleDto } from './api';
import { ManagerSchedule } from './types';

export interface GetManagerScheduleForWeekPayload {
    scheduleForWeek: ManagerSchedule[];
    managerId: number;
}

const getManagerScheduleForWeekPayloadCreator = async (getManagerScheduleForWeekParameters: {
    managerId?: number;
    weekDate?: Date;
}): Promise<ManagerSchedule[]> => {
    const { managerId, weekDate } = getManagerScheduleForWeekParameters;
    return await scheduleApi.getManagerScheduleForWeekAsync(
        managerId,
        weekDate,
    );
};

export const getManagerScheduleForWeekThunk = createAsyncThunk(
    'schedule/getManagerScheduleForWeekThunkStatus',
    getManagerScheduleForWeekPayloadCreator,
);

export const createManagerScheduleThunk = createAsyncThunk(
    'schedule/createManagerScheduleThunkStatus',
    async (managerSchedule: ManagerSchedule) => {
        return await scheduleApi.createManagerScheduleAsync(managerSchedule);
    },
);

export const updateManagerScheduleThunk = createAsyncThunk(
    'schedule/updateManagerScheduleThunkStatus',
    async (updateManagerScheduleParameters: {
        id: number;
        updateManagerScheduleDto: UpdateManagerScheduleDto;
    }) => {
        const {
            id,
            updateManagerScheduleDto,
        } = updateManagerScheduleParameters;
        return await scheduleApi.updateManagerScheduleAsync(
            id,
            updateManagerScheduleDto,
        );
    },
);

export interface DeleteManagerSchedulePayload {
    id: number;
    managerId: number;
}

export const deleteManagerScheduleThunk = createAsyncThunk(
    'schedule/deleteManagerScheduleThunkStatus',
    async (deleteManagerScheduleParameters: {
        id: number;
        managerId: number;
    }) => {
        const { id, managerId } = deleteManagerScheduleParameters;
        const deletedId = await scheduleApi.deleteManagerScheduleAsync(id);
        return {
            id: deletedId,
            managerId,
        };
    },
);
