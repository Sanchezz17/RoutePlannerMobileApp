import { createAsyncThunk } from '@reduxjs/toolkit';

import { DEFAULT_LIMIT } from '../../common/constants';
import { CreateMeetingDto, meetingsApi, UpdateMeetingDto } from './api';

export interface MeetingsSearchParameters {
    offset?: number;
    limit?: number;
    query?: string;
    date?: Date;
}

const getMeetingsPayloadCreator = async ({
    offset,
    limit,
    query,
    date,
}: MeetingsSearchParameters) => {
    return await meetingsApi.getMeetingsAsync(
        offset ?? 0,
        limit ?? DEFAULT_LIMIT,
        query ?? '',
        date ?? new Date(),
    );
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
    async (meeting: CreateMeetingDto) => {
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

export const updateMeetingEndTimeThunk = createAsyncThunk(
    'meetings/updateMeetingEndTimeThunkStatus',
    async (updateMeetingEndTimeParameters: { id: number; endTime: Date }) => {
        const { id, endTime } = updateMeetingEndTimeParameters;
        return await meetingsApi.updateMeetingEndTimeAsync(id, endTime);
    },
);

export const deleteMeetingThunk = createAsyncThunk(
    'meeting/deleteMeetingThunkStatus',
    async (id: number) => {
        return await meetingsApi.deleteMeetingAsync(id);
    },
);
