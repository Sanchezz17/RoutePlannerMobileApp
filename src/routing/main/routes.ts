import { User } from '../../redux/users/types';

export enum DrawerRoutes {
    Info = 'Info',
    Options = 'Options',
    Requests = 'Requests',
    Managers = 'Managers',
    Clients = 'Clients',
    Meetings = 'Meetings',
    Schedule = 'Schedule',
    Route = 'Route',
    Map = 'Map',
}

export type RootDrawerParamList = {
    [DrawerRoutes.Info]: undefined;
    [DrawerRoutes.Options]: { user: User };
    [DrawerRoutes.Requests]: undefined;
    [DrawerRoutes.Managers]: undefined;
    [DrawerRoutes.Clients]: undefined;
    [DrawerRoutes.Meetings]: undefined;
    [DrawerRoutes.Schedule]: undefined;
    [DrawerRoutes.Route]: undefined;
    [DrawerRoutes.Map]: undefined;
};
