import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import createMap from '../../common/utils/createMap';
import {
    createManagerScheduleThunk,
    DeleteManagerSchedulePayload,
    deleteManagerScheduleThunk,
    GetManagerScheduleForWeekPayload,
    getManagerScheduleForWeekThunk,
    updateManagerScheduleThunk,
} from './thunks';
import { ManagerSchedule } from './types';

export interface ScheduleState {
    loadingSchedule: boolean;
    schedule: { [key: number]: { [key: number]: ManagerSchedule } };
}

const initialState: ScheduleState = {
    loadingSchedule: false,
    schedule: {},
};

const scheduleSlice = createSlice({
    name: 'scheduleSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getManagerScheduleForWeekThunk.pending.type]: (
            state: ScheduleState,
        ) => {
            state.loadingSchedule = true;
        },
        [getManagerScheduleForWeekThunk.fulfilled.type]: (
            state: ScheduleState,
            action: PayloadAction<GetManagerScheduleForWeekPayload>,
        ) => {
            const { scheduleForWeek, managerId } = action.payload;
            state.schedule[managerId] = {
                ...state.schedule[managerId],
                ...createMap(scheduleForWeek),
            };
            state.loadingSchedule = false;
        },
        [createManagerScheduleThunk.fulfilled.type]: (
            state: ScheduleState,
            action: PayloadAction<ManagerSchedule>,
        ) => {
            const createdManagerSchedule = action.payload;
            const managerId = createdManagerSchedule.userId;
            if (!state.schedule[managerId]) {
                state.schedule[managerId] = {};
            }
            state.schedule[managerId][
                createdManagerSchedule.id
            ] = createdManagerSchedule;
        },
        [updateManagerScheduleThunk.fulfilled.type]: (
            state: ScheduleState,
            action: PayloadAction<ManagerSchedule>,
        ) => {
            const updatedManagerSchedule = action.payload;
            const managerId = updatedManagerSchedule.userId;
            if (!state.schedule[managerId]) {
                state.schedule[managerId] = {};
            }
            state.schedule[managerId][
                updatedManagerSchedule.id
            ] = updatedManagerSchedule;
        },
        [deleteManagerScheduleThunk.fulfilled.type]: (
            state: ScheduleState,
            action: PayloadAction<DeleteManagerSchedulePayload>,
        ) => {
            const { id, managerId } = action.payload;
            if (state.schedule[managerId]) {
                delete state.schedule[managerId][id];
            }
        },
    },
});

export default scheduleSlice.reducer;
