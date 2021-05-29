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
import { ScheduleRoutes } from '../../routing/schedule/routes';
import { ScheduleStackNavigationProps } from '../../routing/schedule/types';
import styles, { theme } from './AddScheduleScreen.styles';
type AddScheduleScreenProps = ScheduleStackNavigationProps<ScheduleRoutes.AddSchedule>;

export const AddScheduleScreen = ({
    route,
    navigation,
}: AddScheduleScreenProps) => {
    const dispatch = useAppDispatch();
    const date = route.params.date;
    const currentSchedule = route.params.schedule;
    const userID = route.params.userId;
    const [startTime, setStartTime] = useState(currentSchedule.startTime);
    const [endTime, setEndTime] = useState(currentSchedule.endTime);
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
        if (currentSchedule.id === 0) {
            dispatch(
                createManagerScheduleThunk({
                    id: 0,
                    userId: userID,
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
                        value={currentSchedule.startTime}
                        title={'Начало свободного времени:'}
                    />
                    <TimePicker
                        onChange={onChangeEndTime}
                        value={currentSchedule.endTime}
                        title={'Конец свободного времени:'}
                    />
                    <LocationPicker
                        initialCoordinate={currentSchedule.startCoordinate}
                        onChange={(newCoordinate) =>
                            setStartCoordinate(newCoordinate)
                        }
                        label={'Место встречи'}
                    />
                    <LocationPicker
                        initialCoordinate={currentSchedule.endCoordinate}
                        onChange={(newCoordinate) =>
                            setEndCoordinate(newCoordinate)
                        }
                        label={'Место встречи'}
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
