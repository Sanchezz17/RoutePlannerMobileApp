import { StackScreenProps } from '@react-navigation/stack';

import { ClientsRoutes, ClientsStackParamList } from './routes';

export type ClientsStackNavigationProps<
    RouteName extends keyof ClientsStackParamList = ClientsRoutes
> = StackScreenProps<ClientsStackParamList, RouteName>;
