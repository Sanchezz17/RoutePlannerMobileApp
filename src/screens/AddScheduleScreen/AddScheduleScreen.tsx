import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Divider, FAB, Text } from 'react-native-paper';

import { LocationPicker } from '../../components/Pickers/LocationPicker';
import { TimePicker } from '../../components/Pickers/TimePicker';
import { useAppDispatch } from '../../redux/hooks';
import {
    createManagerScheduleThunk,
    updateManagerScheduleThunk,
} from '../../redux/schedule/thunks';
import { ManagerSchedule } from '../../redux/schedule/types';
import { ScheduleRoutes } from '../../routing/schedule/routes';
import { ScheduleStackNavigationProps } from '../../routing/schedule/types';
import styles, { theme } from './AddScheduleScreen.styles';
type AddScheduleScreenProps = ScheduleStackNavigationProps<ScheduleRoutes.AddSchedule>;

export const AddScheduleScreen = ({
    route,
    navigation,
}: AddScheduleScreenProps) => {
    const dispatch = useAppDispatch();
    const date = new Date(route.params.dateJson);
    const scheduleDto = route.params.schedule;
    const currentSchedule: ManagerSchedule = {
        id: scheduleDto.id,
        userId: scheduleDto.userId,
        startTime: new Date(scheduleDto.startTimeJson),
        endTime: new Date(scheduleDto.endTimeJson),
        startCoordinate: scheduleDto.startCoordinate,
        endCoordinate: scheduleDto.endCoordinate,
    };
    const [startTime, setStartTime] = useState(
        currentSchedule.id !== 0 ? currentSchedule.startTime : undefined,
    );
    const [endTime, setEndTime] = useState(
        currentSchedule.id !== 0 ? currentSchedule.endTime : undefined,
    );
    const [startCoordinate, setStartCoordinate] = useState(
        currentSchedule.startCoordinate,
    );
    const [endCoordinate, setEndCoordinate] = useState(
        currentSchedule.endCoordinate,
    );

    const onChangeStartTime = (event: any, selectedDate: Date | undefined) => {
        setStartTime(selectedDate ?? currentSchedule.startTime);
    };

    const onChangeEndTime = (event: any, selectedDate: Date | undefined) => {
        setEndTime(selectedDate ?? currentSchedule.startTime);
    };

    const onSubmit = useCallback(async () => {
        if (endTime === undefined || startTime === undefined) {
            return;
        }
        if (currentSchedule.id === 0) {
            dispatch(
                createManagerScheduleThunk({
                    id: 0,
                    userId: currentSchedule.userId,
                    endCoordinate: endCoordinate,
                    endTime: endTime,
                    startCoordinate: startCoordinate,
                    startTime: startTime,
                }),
            );
        } else {
            dispatch(
                updateManagerScheduleThunk({
                    id: currentSchedule.id,
                    updateManagerScheduleDto: {
                        startTime: startTime,
                        endTime: endTime,
                        startCoordinate: startCoordinate,
                        endCoordinate: endCoordinate,
                    },
                }),
            );
        }
        navigation.goBack();
    }, [navigation]);

    return (
        <SafeAreaView style={styles.view}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.container}>
                <Text style={styles.day}>{date.toLocaleDateString()}</Text>
                <Divider style={styles.divider} />
                <View style={styles.form}>
                    <TimePicker
                        onChange={onChangeStartTime}
                        value={startTime}
                        title={'Начало смены:'}
                    />
                    <TimePicker
                        onChange={onChangeEndTime}
                        value={endTime}
                        title={'Конец смены:'}
                    />
                    <LocationPicker
                        initialCoordinate={currentSchedule.startCoordinate}
                        onChange={(newCoordinate) =>
                            setStartCoordinate(newCoordinate)
                        }
                        label={'Начало маршрута'}
                    />
                    <LocationPicker
                        initialCoordinate={currentSchedule.endCoordinate}
                        onChange={(newCoordinate) =>
                            setEndCoordinate(newCoordinate)
                        }
                        label={'Конец маршрута'}
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
