import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import createMap from '../../common/utils/createMap';
import {
    createMeetingThunk,
    deleteMeetingThunk,
    getMeetingsThunk,
    getMoreMeetingsThunk,
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
        [createMeetingThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<Meeting>,
        ) => {
            const createdMeeting = action.payload;
            state.meetings[createdMeeting.id] = createdMeeting;
        },
        [updateMeetingThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<Meeting>,
        ) => {
            const updatedMeeting = action.payload;
            state.meetings[updatedMeeting.id] = updatedMeeting;
        },
        [deleteMeetingThunk.fulfilled.type]: (
            state: MeetingsState,
            action: PayloadAction<number>,
        ) => {
            const meetingId = action.payload;
            delete state.meetings[meetingId];
        },
    },
});

export default meetingsSlice.reducer;
