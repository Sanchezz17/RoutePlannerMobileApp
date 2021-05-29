import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Divider, FAB, Text } from 'react-native-paper';

import { DatePicker } from '../../components/Pickers/DatePicker';
import { LocationPicker } from '../../components/Pickers/LocationPicker';
import { TimePicker } from '../../components/Pickers/TimePicker';
import TextInput from '../../components/TextInput/TextInput';
import { useAppDispatch } from '../../redux/hooks';
import {
    createMeetingThunk,
    updateMeetingThunk,
} from '../../redux/meetings/thunks';
import { Coordinate } from '../../redux/users/types';
import { MeetingsRoutes } from '../../routing/meetings/routes';
import { MeetingsStackNavigationProps } from '../../routing/meetings/types';
import styles, { theme } from './AddMeetingScreen.styles';

const DEFAULT_DURATION_IN_MINUTES = 30;

type AddMeetingScreenProps = MeetingsStackNavigationProps<MeetingsRoutes.AddMeeting>;

export const AddMeetingScreen = ({
    route,
    navigation,
}: AddMeetingScreenProps) => {
    const meeting = route.params?.meeting;
    const client = route.params?.client;
    const dispatch = useAppDispatch();

    const [availableTimeStart, setAvailableTimeStart] = useState<
        Date | undefined
    >(meeting !== undefined ? new Date(meeting.availableTimeStart) : undefined);

    const [availableTimeEnd, setAvailableTimeEnd] = useState<Date | undefined>(
        meeting !== undefined ? new Date(meeting.availableTimeEnd) : undefined,
    );

    const [durationInMinutes, setDurationInMinutes] = useState<number>(
        meeting?.durationInMinutes ?? DEFAULT_DURATION_IN_MINUTES,
    );

    const onChangeDate = (event: any, selectedDate: Date | undefined) => {
        const currentStartTime = selectedDate || availableTimeStart;
        setAvailableTimeStart(currentStartTime);
        if (currentStartTime !== undefined) {
            const currentEndTime = new Date(
                currentStartTime.getFullYear(),
                currentStartTime.getMonth(),
                currentStartTime.getDay(),
                availableTimeEnd?.getHours() ?? currentStartTime.getHours(),
                availableTimeEnd?.getMinutes() ?? currentStartTime.getMinutes(),
            );
            setAvailableTimeEnd(currentEndTime);
        }
    };

    const onChangeStartTime = (event: any, selectedDate: Date | undefined) => {
        const currentStartTime = selectedDate || availableTimeStart;
        setAvailableTimeStart(currentStartTime);
    };

    const onChangeEndTime = (event: any, selectedDate: Date | undefined) => {
        const currentEndTime = selectedDate || availableTimeStart;
        setAvailableTimeEnd(currentEndTime);
    };

    const [coordinate, setCoordinate] = useState<Coordinate>(
        meeting?.coordinate ??
            client?.coordinate ?? { address: '', latitude: 0, longitude: 0 },
    );

    const onSubmit = useCallback(async () => {
        if (
            availableTimeStart === undefined ||
            availableTimeEnd === undefined ||
            durationInMinutes === meeting?.durationInMinutes
        ) {
            return;
        }
        if (client !== undefined) {
            dispatch(
                createMeetingThunk({
                    clientId: client.id,
                    durationInMinutes: durationInMinutes,
                    coordinate: coordinate,
                    availableTimeStart: new Date(availableTimeStart),
                    availableTimeEnd: new Date(availableTimeEnd),
                }),
            );
        } else if (meeting !== undefined) {
            dispatch(
                updateMeetingThunk({
                    id: meeting.id,
                    updateMeetingDto: {
                        durationInMinutes: durationInMinutes,
                        coordinate: coordinate,
                        availableTimeStart: new Date(availableTimeStart),
                        availableTimeEnd: new Date(availableTimeEnd),
                    },
                }),
            );
        }
        navigation.goBack();
    }, [
        durationInMinutes,
        availableTimeStart,
        availableTimeEnd,
        client,
        meeting,
        navigation,
        dispatch,
        coordinate,
    ]);

    return (
        <SafeAreaView style={styles.view}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.container}>
                <Text style={styles.day}>
                    Клиент: {client?.name ?? meeting?.client?.name}
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
                        value={availableTimeStart}
                        title={'Дата встречи:'}
                    />
                    <TimePicker
                        onChange={onChangeStartTime}
                        value={availableTimeStart}
                        title={'Начало свободного времени:'}
                    />
                    <TimePicker
                        onChange={onChangeEndTime}
                        value={availableTimeEnd}
                        title={'Конец свободного времени:'}
                    />
                    <TextInput
                        label={'Продолжительность встречи в минутах'}
                        defaultValue={durationInMinutes.toString()}
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={(newValue) => {
                            let newDurationInMinutes = Number.parseInt(
                                newValue,
                                10,
                            );
                            if (Number.isNaN(newDurationInMinutes)) {
                                newDurationInMinutes = DEFAULT_DURATION_IN_MINUTES;
                            }
                            console.log(newDurationInMinutes);
                            setDurationInMinutes(newDurationInMinutes);
                        }}
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
