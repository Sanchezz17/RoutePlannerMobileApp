import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

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
        [getManagerScheduleForWeekThunk.rejected.type]: (
            state: ScheduleState,
        ) => {
            state.loadingSchedule = false;
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при загрузке графика',
                visibilityTime: 1500,
            });
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
        [createManagerScheduleThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при создании смены',
                visibilityTime: 1500,
            });
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
        [updateManagerScheduleThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при обновлении смены',
                visibilityTime: 1500,
            });
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
        [deleteManagerScheduleThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при удалении смены',
                visibilityTime: 1500,
            });
        },
    },
});

export default scheduleSlice.reducer;
