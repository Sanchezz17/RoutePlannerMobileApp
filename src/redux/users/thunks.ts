import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserDto, userAPI } from './api';
import { Right } from './types';

export const getCurrentUserThunk = createAsyncThunk(
    'users/getCurrentUserThunkStatus',
    async (_, __) => {
        return await userAPI.getCurrentUserAsync();
    },
);

export const updateUserThunk = createAsyncThunk(
    'users/updateUserThunkStatus',
    async (
        updateUserParameters: { id: number; updateUserDto: UpdateUserDto },
        _,
    ) => {
        const { id, updateUserDto } = updateUserParameters;
        return await userAPI.updateUserAsync(id, updateUserDto);
    },
);

export const deleteUserThunk = createAsyncThunk(
    'users/deleteUserThunkStatus',
    async (id: number, __) => {
        return await userAPI.deleteUserAsync(id);
    },
);

interface UsersSearchParameters {
    offset: number;
    limit: number;
    query: string;
}

export const getUsersWithoutRightsThunk = createAsyncThunk(
    'users/getUsersWithoutRightsThunkStatus',
    async ({ offset, limit, query }: UsersSearchParameters, __) => {
        return await userAPI.getUsersWithoutRightsAsync(offset, limit, query);
    },
);
export const getManagersThunk = createAsyncThunk(
    'users/getManagersThunkStatus',
    async ({ offset, limit, query }: UsersSearchParameters, __) => {
        return await userAPI.getManagers(offset, limit, query);
    },
);
export const addRightToUserThunk = createAsyncThunk(
    'users/addRightToUserThunkStatus',
    async (addRightToUserParameters: { id: number; right: Right }, _) => {
        const { id, right } = addRightToUserParameters;
        return await userAPI.addRightToUserAsync(id, right);
    },
);
