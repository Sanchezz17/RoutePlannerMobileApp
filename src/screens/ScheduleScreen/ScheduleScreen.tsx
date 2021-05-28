import React, { useState } from 'react';

import { getStartOfWeek } from '../../common/utils/dateUtils';
import { ScheduleDayCard } from '../../components/Cards/ScheduleDayCard/ScheduleDayCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    selectLoadingSchedule,
    selectManagerSchedule,
} from '../../redux/schedule/selectors';
import { getManagerScheduleForWeekThunk } from '../../redux/schedule/thunks';
import { ManagerSchedule } from '../../redux/schedule/types';
import { selectCurrentUser } from '../../redux/users/selectors';
import { MeetingsRoutes } from '../../routing/meetings/routes';
import { MeetingsStackNavigationProps } from '../../routing/meetings/types';

type MeetingsScreenProps = MeetingsStackNavigationProps<MeetingsRoutes.Meetings>;

export const ScheduleScreen = ({ navigation }: MeetingsScreenProps) => {
    const dispatch = useAppDispatch();
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
