import { prefix } from '../../common/constants';
import { authorizeFetch } from '../../common/utils/autorizeFetch';
import { Coordinate } from '../users/types';
import { Meeting } from './types';

const meetingsApiPrefix = `${prefix}/meetings`;

export interface UpdateMeetingDto {
    name: string;
    startTime: Date;
    endTime: Date;
    coordinate: Coordinate;
}

const getMeetingsAsync = async (
    offset: number,
    limit: number,
    query: string,
    date: Date,
): Promise<Meeting> => {
    return await authorizeFetch(
        `${meetingsApiPrefix}?offset=${offset}&limit=${limit}&query=${query}&date=${date}`,
    );
};

const createMeetingAsync = async (meeting: Meeting) => {
    return await authorizeFetch(`${meetingsApiPrefix}`, {
        method: 'POST',
        body: JSON.stringify(meeting),
    });
};

const updateMeetingAsync = async (id: number, updateDto: UpdateMeetingDto) => {
    return await authorizeFetch(`${meetingsApiPrefix}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateDto),
    });
};

const deleteMeetingAsync = async (id: number) => {
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