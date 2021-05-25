import { Client } from '../../redux/clients/types';

export enum ClientsRoutes {
    Clients = 'ClientsScreen',
    AddClient = 'AddClientScreen',
    AddMeeting = 'AddMeetingScreen',
}

export type ClientsStackParamList = {
    [ClientsRoutes.Clients]: undefined;
    [ClientsRoutes.AddClient]: { client?: Client };
    [ClientsRoutes.AddMeeting]: { client?: Client };
};
