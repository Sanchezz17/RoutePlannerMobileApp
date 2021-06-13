import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import createMap from '../../common/utils/createMap';
import {
    createMeetingThunk,
    deleteMeetingThunk,
    getMeetingsThunk,
    getMoreMeetingsThunk,
    updateMeetingEndTimeThunk,
    updateMeetingThunk,
} from './thunks';
import { Meeting } from './types';

export interface MeetingsState {
    meetings: { [key: number]: Meeting };
    loadingMeetings: boolean;
}

const initialState: MeetingsState = {
    meetings: {},
    loadingMeetings: false,
};

const meetingsSlice = createSlice({
    name: 'meetingsSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getMeetingsThunk.pending.type]: (state: MeetingsState) => {
            state.loadingMeetings = true;
        },
        [getMeetingsThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<Meeting[]>,
        ) => {
            state.meetings = createMap(action.payload);
            state.loadingMeetings = false;
        },
        [getMeetingsThunk.rejected.type]: (state: MeetingsState) => {
            state.loadingMeetings = false;
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при загрузке встреч',
                visibilityTime: 1500,
            });
        },
        [getMoreMeetingsThunk.pending.type]: (state: MeetingsState) => {
            state.loadingMeetings = true;
        },
        [getMoreMeetingsThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<Meeting[]>,
        ) => {
            const extraMeetingsMap = createMap(action.payload);
            state.meetings = { ...state.meetings, ...extraMeetingsMap };
            state.loadingMeetings = false;
        },
        [getMoreMeetingsThunk.rejected.type]: (state: MeetingsState) => {
            state.loadingMeetings = false;
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при загрузке встреч',
                visibilityTime: 1500,
            });
        },
        [createMeetingThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<Meeting>,
        ) => {
            const createdMeeting = action.payload;
            state.meetings[createdMeeting.id] = createdMeeting;
        },
        [createMeetingThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при создании встречи',
                visibilityTime: 1500,
            });
        },
        [updateMeetingThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<Meeting>,
        ) => {
            const updatedMeeting = action.payload;
            state.meetings[updatedMeeting.id] = updatedMeeting;
        },
        [updateMeetingThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при обновлении встречи',
                visibilityTime: 1500,
            });
        },
        [updateMeetingEndTimeThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<Meeting>,
        ) => {
            const updatedMeeting = action.payload;
            state.meetings[updatedMeeting.id] = updatedMeeting;
        },
        [updateMeetingEndTimeThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2:
                    'Произошла ошибка при обновлении времени окончания встречи',
                visibilityTime: 1500,
            });
        },
        [deleteMeetingThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<number>,
        ) => {
            const meetingId = action.payload;
            delete state.meetings[meetingId];
        },
        [deleteMeetingThunk.rejected.type]: () => {
            Toast.show({
                type: 'error',
                text2: 'Произошла ошибка при удалении встречи',
                visibilityTime: 1500,
            });
        },
    },
});

export default meetingsSlice.reducer;
