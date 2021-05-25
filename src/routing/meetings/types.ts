import { StackScreenProps } from '@react-navigation/stack';

import { MeetingsRoutes, MeetingsStackParamList } from './routes';

export type MeetingsStackNavigationProps<
    RouteName extends keyof MeetingsStackParamList = MeetingsRoutes
> = StackScreenProps<MeetingsStackParamList, RouteName>;
