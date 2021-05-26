import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Divider, FAB, Text } from 'react-native-paper';

import BackIcon from '../../components/icons/Header/BackIcon';
import { DatePicker } from '../../components/Pickers/DatePicker';
import { LocationPicker } from '../../components/Pickers/LocationPicker';
import { TimePicker } from '../../components/Pickers/TimePicker';
import { useAppDispatch } from '../../redux/hooks';
import {
    createMeetingThunk,
    updateMeetingThunk,
} from '../../redux/meetings/thunks';
import { Coordinate } from '../../redux/users/types';
import { MeetingsRoutes } from '../../routing/meetings/routes';
import { MeetingsStackNavigationProps } from '../../routing/meetings/types';
import styles, { theme } from './AddMeetingScreen.styles';
type AddMeetingScreenProps = MeetingsStackNavigationProps<MeetingsRoutes.AddMeeting>;

export const AddMeetingScreen = ({
    route,
    navigation,
}: AddMeetingScreenProps) => {
    const meeting = route.params?.meeting;
    const client = route.params?.client;
    const dispatch = useAppDispatch();

    const [startTime, setStartTime] = useState<Date | undefined>(
        meeting !== undefined ? new Date(meeting.startTime) : undefined,
    );
    const [endTime, setEndTime] = useState<Date | undefined>(
        meeting !== undefined ? new Date(meeting.endTime) : undefined,
    );

    const onChangeDate = (event: any, selectedDate: Date | undefined) => {
        const currentStartTime = selectedDate || startTime;
        setStartTime(currentStartTime);
        if (currentStartTime !== undefined) {
            const currentEndTime = new Date(
                currentStartTime.getFullYear(),
                currentStartTime.getMonth(),
                currentStartTime.getDay(),
                endTime?.getHours() ?? currentStartTime.getHours(),
                endTime?.getMinutes() ?? currentStartTime.getMinutes(),
            );
            setEndTime(currentEndTime);
        }
    };

    const onChangeStartTime = (event: any, selectedDate: Date | undefined) => {
        const currentStartTime = selectedDate || startTime;
        setStartTime(currentStartTime);
    };

    const onChangeEndTime = (event: any, selectedDate: Date | undefined) => {
        const currentEndTime = selectedDate || startTime;
        setEndTime(currentEndTime);
    };

    const [coordinate, setCoordinate] = useState<Coordinate>(
        meeting?.coordinate ??
            client?.coordinate ?? { address: '', latitude: 0, longitude: 0 },
    );
    const onSubmit = useCallback(async () => {
        if (startTime === undefined || endTime === undefined) {
            return;
        }
        if (client !== undefined) {
            dispatch(
                createMeetingThunk({
                    clientId: client.id,
                    name: client.name,
                    coordinate: coordinate,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                }),
            );
        } else if (meeting !== undefined) {
            dispatch(
                updateMeetingThunk({
                    id: meeting.id,
                    updateMeetingDto: {
                        name: meeting.name,
                        coordinate: coordinate,
                        startTime: new Date(startTime),
                        endTime: new Date(endTime),
                    },
                }),
            );
        }
        navigation.goBack();
    }, [startTime, endTime, client, meeting, navigation, dispatch, coordinate]);

    return (
        <SafeAreaView style={styles.view}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.container}>
                <Text style={styles.clientName}>
                    Клиент: {meeting?.name ?? client?.name}
                </Text>
                <Divider style={styles.divider} />
                <View style={styles.form}>
                    <LocationPicker
                        initialCoordinate={coordinate}
                        onChange={(newCoordinate) =>
                            setCoordinate(newCoordinate)
                        }
                        label={'Место встречи'}
                    />
                    <DatePicker
                        onChange={onChangeDate}
                        value={startTime}
                        title={'Дата встречи:'}
                    />
                    <TimePicker
                        onChange={onChangeStartTime}
                        value={startTime}
                        title={'Начало встречи:'}
                    />
                    <TimePicker
                        onChange={onChangeEndTime}
                        value={endTime}
                        title={'Конец встречи:'}
                    />
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon={'check'}
                color={'black'}
                onPress={onSubmit}
                theme={theme}
            />
        </SafeAreaView>
    );
};
