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

export const getUsersWithoutRightsThunk = createAsyncThunk(
    'users/getUsersWithoutRightsThunkStatus',
    async (_, __) => {
        return await userAPI.getUsersWithoutRightsAsync();
    },
);
export const getManagersThunk = createAsyncThunk(
    'users/getManagersThunkStatus',
    async (_, __) => {
        return await userAPI.getManagers();
    },
);
export const addRightToUserThunk = createAsyncThunk(
    'users/addRightToUserThunkStatus',
    async (addRightToUserParameters: { id: number; right: Right }, _) => {
        const { id, right } = addRightToUserParameters;
        return await userAPI.addRightToUserAsync(id, right);
    },
);
