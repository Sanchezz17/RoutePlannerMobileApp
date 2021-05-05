import { User } from '../redux/users/types';

export enum DrawerRoutes {
    Home = 'Home',
    Options = 'Options',
}

export type RootDrawerParamList = {
    [DrawerRoutes.Home]: undefined;
    [DrawerRoutes.Options]: { user: User };
};
