import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text, Title } from 'react-native-paper';

import { DAY_MILLISECONDS } from '../../../common/utils/dateUtils';
import { ManagerSchedule } from '../../../redux/schedule/types';

export interface ScheduleDayCardProps {
    managerSchedule: ManagerSchedule;
    style?: StyleProp<ViewStyle>;
    dayOfWeek: number;
    weekStart: Date;
}

export const ScheduleDayCard = ({
    managerSchedule,
    style,
    dayOfWeek,
    weekStart,
}: ScheduleDayCardProps) => {
    return (
        <View style={[style]}>
            <TouchableOpacity>
                <Title>
                    {new Date(
                        weekStart.getTime() +
                            (dayOfWeek - 1) * DAY_MILLISECONDS,
                    ).toLocaleDateString()}
                </Title>
                <View>
                    <View>
                        <Text>Начало:</Text>
                        <Text>{managerSchedule.startCoordinate.address}</Text>
                    </View>
                    <View>
                        <Text>Часы работы:</Text>
                        <Text>
                            {managerSchedule.startTime.toLocaleTimeString()} -{' '}
                            {managerSchedule.endTime.toLocaleTimeString()}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
