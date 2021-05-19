import { DrawerScreenProps } from '@react-navigation/drawer';

import { DrawerRoutes, RootDrawerParamList } from './routes';

export type DrawerNavigationProps<
    RouteName extends keyof RootDrawerParamList = DrawerRoutes
> = DrawerScreenProps<RootDrawerParamList, RouteName>;
