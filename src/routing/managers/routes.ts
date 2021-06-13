import { NavigatorScreenParams } from '@react-navigation/native';

import { User } from '../../redux/users/types';
import { RootDrawerParamList } from '../main/routes';

export enum ManagersRoutes {
    Managers = 'ManagersScreen',
    Options = 'ManagerOptions',
    CurrentUserOptions = 'Options',
    Schedule = 'ManagerSchedule',
    Route = 'ManagerRoute',
}

export type ManagersStackParamList = {
    [ManagersRoutes.CurrentUserOptions]: NavigatorScreenParams<RootDrawerParamList>;
    [ManagersRoutes.Managers]: undefined;
    [ManagersRoutes.Options]: { user: User };
    [ManagersRoutes.Schedule]: { user: User };
    [ManagersRoutes.Route]: { user: User };
};
