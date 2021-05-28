import { createAsyncThunk } from '@reduxjs/toolkit';

import { DEFAULT_LIMIT } from '../../common/constants';
import { UpdateUserDto, userAPI } from './api';
import { Right } from './types';

export const getCurrentUserThunk = createAsyncThunk(
    'users/getCurrentUserThunkStatus',
    async () => {
        return await userAPI.getCurrentUserAsync();
    },
);

export const updateUserThunk = createAsyncThunk(
    'users/updateUserThunkStatus',
    async (updateUserParameters: {
        id: number;
        updateUserDto: UpdateUserDto;
    }) => {
        const { id, updateUserDto } = updateUserParameters;
        return await userAPI.updateUserAsync(id, updateUserDto);
    },
);

export const deleteUserThunk = createAsyncThunk(
    'users/deleteUserThunkStatus',
    async (id: number) => {
        return await userAPI.deleteUserAsync(id);
    },
);

export interface UsersSearchParameters {
    offset?: number;
    limit?: number;
    query?: string;
}

const getManagersPayloadCreator = async ({
    offset,
    limit,
    query,
}: UsersSearchParameters) => {
    return await userAPI.getManagers(
        offset ?? 0,
        limit ?? DEFAULT_LIMIT,
        query ?? '',
    );
};

export const getManagersThunk = createAsyncThunk(
    'users/getManagersThunkStatus',
    getManagersPayloadCreator,
);

export const getMoreManagersThunk = createAsyncThunk(
    'users/getMoreManagerThunkStatus',
    getManagersPayloadCreator,
);

export const addRightToUserThunk = createAsyncThunk(
    'users/addRightToUserThunkStatus',
    async (addRightToUserParameters: { id: number; right: Right }) => {
        const { id, right } = addRightToUserParameters;
        return await userAPI.addRightToUserAsync(id, right);
    },
);
