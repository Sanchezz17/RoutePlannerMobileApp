import { StackScreenProps } from '@react-navigation/stack';

import { ManagersRoutes, ManagersStackParamList } from './routes';

export type ManagersStackNavigationProps<
    RouteName extends keyof ManagersStackParamList = ManagersRoutes
> = StackScreenProps<ManagersStackParamList, RouteName>;
