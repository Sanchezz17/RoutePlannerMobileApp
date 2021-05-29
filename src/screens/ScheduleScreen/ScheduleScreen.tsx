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

export const ScheduleScreen = ({ navigation }: ScheduleScreenProps) => {
    const [date, setDate] = useState(getStartOfWeek(new Date()));
    const currentUser = useAppSelector(selectCurrentUser);
    return (
        <ListScreen
            loadDataThunk={getManagerScheduleForWeekThunk}
            dataSelector={(state) =>
                selectManagerSchedule(state, currentUser.id, date)
            }
            loadingSelector={selectLoadingSchedule}
            renderCard={(managerSchedule: ManagerSchedule, index) => (
                <ScheduleDayCard
                    managerSchedule={managerSchedule}
                    dayOfWeek={index}
                    weekStart={date}
                    onPress={() => {
                        navigation.navigate(ScheduleRoutes.AddSchedule, {
                            schedule: managerSchedule,
                            date: new Date(
                                date.getTime() + index * DAY_MILLISECONDS,
                            ),
                            userId: currentUser.id,
                        });
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
