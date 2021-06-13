import React, { useState } from 'react';

import { DAY_MILLISECONDS, getStartOfWeek } from '../../common/utils/dateUtils';
import { ScheduleDayCard } from '../../components/Cards/ScheduleDayCard/ScheduleDayCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import { useAppSelector } from '../../redux/hooks';
import {
    selectLoadingSchedule,
    selectManagerSchedule,
} from '../../redux/schedule/selectors';
import { getManagerScheduleForWeekThunk } from '../../redux/schedule/thunks';
import { ManagerSchedule } from '../../redux/schedule/types';
import { selectCurrentUser } from '../../redux/users/selectors';
import { ScheduleRoutes } from '../../routing/schedule/routes';
import { ScheduleStackNavigationProps } from '../../routing/schedule/types';

type ScheduleScreenProps = ScheduleStackNavigationProps<ScheduleRoutes.Schedule>;

export const ScheduleScreen = ({ navigation, route }: ScheduleScreenProps) => {
    const [date, setDate] = useState(getStartOfWeek(new Date()));
    const currentUser = useAppSelector(selectCurrentUser);
    const paramsUser = route.params?.user;
    const user = paramsUser ?? currentUser;

    return (
        <ListScreen
            loadDataThunk={getManagerScheduleForWeekThunk}
            dataSelector={(state) =>
                selectManagerSchedule(state, user.id, date)
            }
            loadingSelector={selectLoadingSchedule}
            renderCard={(managerSchedule: ManagerSchedule, index) => (
                <ScheduleDayCard
                    managerSchedule={{
                        id: managerSchedule.id,
                        userId: managerSchedule.userId,
                        startTime: new Date(managerSchedule.startTime),
                        endTime: new Date(managerSchedule.endTime),
                        startCoordinate: managerSchedule.startCoordinate,
                        endCoordinate: managerSchedule.endCoordinate,
                    }}
                    dayOfWeek={index}
                    weekStart={date}
                    onPress={() => {
                        if (!paramsUser) {
                            navigation.navigate(ScheduleRoutes.AddSchedule, {
                                schedule: {
                                    id: managerSchedule.id,
                                    userId: managerSchedule.userId,
                                    startTimeJson: new Date(
                                        managerSchedule.startTime,
                                    ).toJSON(),
                                    endTimeJson: new Date(
                                        managerSchedule.endTime,
                                    ).toJSON(),
                                    startCoordinate:
                                        managerSchedule.startCoordinate,
                                    endCoordinate:
                                        managerSchedule.endCoordinate,
                                },
                                dateJson: new Date(
                                    date.getTime() + index * DAY_MILLISECONDS,
                                ).toJSON(),
                            });
                        }
                    }}
                />
            )}
            cardKeyExtractor={(
                managerSchedule: ManagerSchedule,
                index: number,
            ) => `${managerSchedule.id}_${managerSchedule.userId}_${index}`}
            useDateSelector={true}
            dateSelectorStartDate={getStartOfWeek(new Date())}
            dateSelectorStep={7}
            onDateChange={setDate}
        />
    );
};
