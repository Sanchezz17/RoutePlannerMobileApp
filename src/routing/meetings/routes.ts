import { Client } from '../../redux/clients/types';
import { Meeting } from '../../redux/meetings/types';

export enum MeetingsRoutes {
    Meetings = 'MeetingsScreen',
    AddMeeting = 'AddMeetingScreen',
}

export type MeetingsStackParamList = {
    [MeetingsRoutes.Meetings]: undefined;
    [MeetingsRoutes.AddMeeting]: { meeting?: Meeting; client?: Client };
};
