import { User } from '../redux/users/types';

export enum DrawerRoutes {
    Home = 'Home',
    Options = 'Options',
    Requests = 'Requests',
}

export type RootDrawerParamList = {
    [DrawerRoutes.Home]: undefined;
    [DrawerRoutes.Options]: { user: User };
    [DrawerRoutes.Requests]: undefined;
};
