import { createAsyncThunk } from '@reduxjs/toolkit';

import { meetingsApi, UpdateMeetingDto } from './api';
import { Meeting } from './types';

export interface MeetingsSearchParameters {
    offset: number;
    limit: number;
    query: string;
    date?: Date;
}

const getMeetingsPayloadCreator = async ({
    offset,
    limit,
    query,
    date,
}: MeetingsSearchParameters) => {
    return await meetingsApi.getMeetingsAsync(offset, limit, query, date);
};

export const getMeetingsThunk = createAsyncThunk(
    'meetings/getMeetingsThunkStatus',
    getMeetingsPayloadCreator,
);

export const getMoreMeetingsThunk = createAsyncThunk(
    'meetings/getMoreMeetingsThunkStatus',
    getMeetingsPayloadCreator,
);

export const createMeetingThunk = createAsyncThunk(
    'meetings/createMeetingThunkStatus',
    async (meeting: Meeting) => {
        return await meetingsApi.createMeetingAsync(meeting);
    },
);

export const updateMeetingThunk = createAsyncThunk(
    'meetings/updateMeetingThunkStatus',
    async (updateMeetingParameters: {
        id: number;
        updateMeetingDto: UpdateMeetingDto;
    }) => {
        const { id, updateMeetingDto } = updateMeetingParameters;
        return await meetingsApi.updateMeetingAsync(id, updateMeetingDto);
    },
);

export const deleteMeetingThunk = createAsyncThunk(
    'meeting/deleteMeetingThunkStatus',
    async (id: number) => {
        return await meetingsApi.deleteMeetingAsync(id);
    },
);
