import { StackScreenProps } from '@react-navigation/stack';

import { ScheduleRoutes, ScheduleStackParamList } from './routes';

export type ScheduleStackNavigationProps<
    RouteName extends keyof ScheduleStackParamList = ScheduleRoutes
> = StackScreenProps<ScheduleStackParamList, RouteName>;
