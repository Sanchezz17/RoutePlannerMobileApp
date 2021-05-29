import { prefix } from '../../common/constants';
import { authorizeFetch } from '../../common/utils/autorizeFetch';
import { Coordinate } from '../users/types';
import { Meeting } from './types';

const meetingsApiPrefix = `${prefix}/meetings`;

export interface UpdateMeetingDto {
    durationInMinutes: number;
    availableTimeStart: Date;
    availableTimeEnd: Date;
    coordinate: Coordinate;
}

export interface CreateMeetingDto {
    clientId: number;
    availableTimeStart: Date;
    availableTimeEnd: Date;
    durationInMinutes: number;
    coordinate: Coordinate;
}

const getMeetingsAsync = async (
    offset: number,
    limit: number,
    query: string,
    date: Date,
): Promise<Meeting[]> => {
    return await authorizeFetch(
        `${meetingsApiPrefix}?offset=${offset}&limit=${limit}&query=${query}&date=${date?.toJSON()}`,
    );
};

const createMeetingAsync = async (
    meeting: CreateMeetingDto,
): Promise<Meeting> => {
    return await authorizeFetch(`${meetingsApiPrefix}`, {
        method: 'POST',
        body: JSON.stringify(meeting),
    });
};

const updateMeetingAsync = async (
    id: number,
    updateDto: UpdateMeetingDto,
): Promise<Meeting> => {
    return await authorizeFetch(`${meetingsApiPrefix}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateDto),
    });
};

const deleteMeetingAsync = async (id: number): Promise<number> => {
    return await authorizeFetch(`${meetingsApiPrefix}/${id}`, {
        method: 'DELETE',
    });
};

export const meetingsApi = {
    getMeetingsAsync,
    createMeetingAsync,
    updateMeetingAsync,
    deleteMeetingAsync,
};
