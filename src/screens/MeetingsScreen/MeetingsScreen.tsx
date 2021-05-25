import React from 'react';

import { MeetingCard } from '../../components/Cards/MeetingCard/MeetingCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import { useAppDispatch } from '../../redux/hooks';
import {
    selectLoadingMeetings,
    selectMeetings,
} from '../../redux/meetings/selectors';
import {
    deleteMeetingThunk,
    getMeetingsThunk,
    getMoreMeetingsThunk,
} from '../../redux/meetings/thunks';
import { Meeting } from '../../redux/meetings/types';
import { MeetingsRoutes } from '../../routing/meetings/routes';
import { MeetingsStackNavigationProps } from '../../routing/meetings/types';

type MeetingsScreenProps = MeetingsStackNavigationProps<MeetingsRoutes.Meetings>;

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
                        {
                            name: 'Редактировать',
                            action: () => {
                                navigation.navigate(MeetingsRoutes.AddMeeting, {
                                    meeting: meeting,
                                });
                            },
                        },
                        {
                            name: 'Удалить',
                            action: () => {
                                dispatch(deleteMeetingThunk(meeting.id));
                            },
                        },
                    ]}
                />
            )}
            cardKeyExtractor={(meeting: Meeting) =>
                `${meeting.id}${meeting.name}`
            }
            //@ts-ignore
            navigation={navigation.dangerouslyGetParent()}
            screenTitle={'Встречи'}
            getDate={() => new Date()}
        />
    );
};
