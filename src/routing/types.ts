import { DrawerRoutes, RootDrawerParamList } from './routes';
import { DrawerScreenProps } from '@react-navigation/drawer';

export type DrawerNavigationProps<
    RouteName extends keyof RootDrawerParamList = DrawerRoutes
> = DrawerScreenProps<RootDrawerParamList, RouteName>;
