import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { FAB } from 'react-native-paper';

import { GooglePlacesInput } from '../../components/GooglePlacesInput/GooglePlacesInput';
import { Client, defaultClient } from '../../redux/clients/types';
import { useAppDispatch } from '../../redux/hooks';
import {
    createMeetingThunk,
    updateMeetingThunk,
} from '../../redux/meetings/thunks';
import { Meeting } from '../../redux/meetings/types';
import { Coordinate } from '../../redux/users/types';
import { MeetingsRoutes } from '../../routing/meetings/routes';
import { MeetingsStackNavigationProps } from '../../routing/meetings/types';
import styles, { theme } from './AddMeetingScreen.styles';

type AddMeetingScreenProps = MeetingsStackNavigationProps<MeetingsRoutes.AddMeeting>;

const getMeeting = (client: Client) => {
    const meeting: Meeting = {
        client: client,
        clientId: 0,
        coordinate: client.coordinate,
        endTime: new Date(),
        id: 0,
        name: client.name,
        startTime: new Date(),
    };
    return meeting;
};

export const AddMeetingScreen = ({
    route,
    navigation,
}: AddMeetingScreenProps) => {
    const meeting =
        route.params?.meeting ??
        getMeeting(route.params?.client ?? defaultClient);
    const dispatch = useAppDispatch();

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [startTime, setStartTime] = useState<Date | undefined>(undefined);
    const [endTime, setEndTime] = useState<Date | undefined>(undefined);

    const [coordinate, setCoordinate] = useState<Coordinate>(
        meeting.coordinate,
    );
    const onSubmit = useCallback(async () => {
        if (
            startTime === undefined ||
            endTime === undefined ||
            date === undefined
        ) {
            return;
        }
        if (meeting.id === 0) {
            dispatch(
                createMeetingThunk({
                    client: meeting.client,
                    clientId: meeting.clientId,
                    name: meeting.name,
                    coordinate: coordinate,
                    startTime: new Date(date.getTime() + startTime.getTime()),
                    endTime: new Date(date.getTime() + endTime.getTime()),
                }),
            );
        } else {
            dispatch(
                updateMeetingThunk({
                    id: meeting.id,
                    updateMeetingDto: {
                        name: meeting.name,
                        coordinate: coordinate,
                        startTime: new Date(
                            date.getTime() + startTime.getTime(),
                        ),
                        endTime: new Date(date.getTime() + endTime.getTime()),
                    },
                }),
            );
        }
        navigation.goBack();
    }, [meeting.id, navigation, dispatch, coordinate]);

    return (
        <SafeAreaView style={styles.view}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <View>
                        <GooglePlacesInput
                            address={coordinate?.address}
                            onChangeCoordinate={(newCoordinate) =>
                                setCoordinate(newCoordinate)
                            }
                        />
                    </View>
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon={'check'}
                color={'black'}
                onPress={() => onSubmit()}
                theme={theme}
            />
        </SafeAreaView>
    );
};
