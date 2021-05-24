import React from 'react';

import { MeetingCard } from '../../components/MeetingCard/MeetingCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import { useAppDispatch } from '../../redux/hooks';
import {
    selectLoadingMeetings,
    selectMeetings,
} from '../../redux/meetings/selectors';
import {
    getMeetingsThunk,
    getMoreMeetingsThunk,
} from '../../redux/meetings/thunks';
import { Meeting } from '../../redux/meetings/types';
import { DrawerRoutes } from '../../routing/main/routes';
import { DrawerNavigationProps } from '../../routing/main/types';

type MeetingsScreenProps = DrawerNavigationProps<DrawerRoutes.Meetings>;

export const MeetingsScreen = ({ navigation }: MeetingsScreenProps) => {
    const dispatch = useAppDispatch();
    return (
        <ListScreen
            loadDataThunk={getMeetingsThunk}
            loadMoreDataThunk={getMoreMeetingsThunk}
            dataSelector={selectMeetings}
            loadingSelector={selectLoadingMeetings}
            renderCard={(
                meeting: Meeting,
                index,
                expandedCardIndex,
                setExpandedCardIndex,
            ) => (
                <MeetingCard
                    meeting={meeting}
                    key={index}
                    cardNumber={index}
                    expandedCardNumber={expandedCardIndex}
                    setExpandedCardNumber={(cardNumber: number) =>
                        setExpandedCardIndex(cardNumber)
                    }
                    menuItems={[
                        { name: 'Редактировать', action: () => {} },
                        { name: 'Удалить', action: () => {} },
                    ]}
                />
            )}
            cardKeyExtractor={(meeting: Meeting) =>
                `${meeting.id}${meeting.name}`
            }
            //@ts-ignore
            navigation={navigation}
            screenTitle={'Встречи'}
            getDate={() => new Date()}
        />
    );
};
