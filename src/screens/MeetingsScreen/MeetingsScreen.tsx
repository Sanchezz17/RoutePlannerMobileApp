import React from 'react';
import { Text } from 'react-native';

import { ListScreen } from '../../containers/ListScreen/ListScreen';
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

export const MeetingsScreen = (_: MeetingsScreenProps) => {
    return (
        <></>
        // <ListScreen
        //     renderCard={(meeting: Meeting) => <Text>{meeting.name}</Text>}
        //     cardKeyExtractor={(item: Meeting) =>
        //         `${item.id}${item.client.name}`
        //     }
        //     dataSelector={selectMeetings}
        //     loadingSelector={selectLoadingMeetings}
        //     loadDataThunk={getMeetingsThunk}
        //     loadMoreDataThunk={getMoreMeetingsThunk}
        // />
    );
};
