import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text, Title } from 'react-native-paper';

import { DAY_MILLISECONDS } from '../../../common/utils/dateUtils';
import { ManagerSchedule } from '../../../redux/schedule/types';
import AlertIcon from '../../icons/Cards/AlertIcon';
import styles from './ScheduleDayCard.styles';

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
        <View style={[style, styles.card]}>
            <TouchableOpacity style={styles.touchable}>
                <AlertIcon
                    style={
                        managerSchedule.id === 0
                            ? styles.iconVisible
                            : styles.iconInvisible
                    }
                />
                <Title style={styles.title}>
                    {new Date(
                        weekStart.getTime() + dayOfWeek * DAY_MILLISECONDS,
                    ).toLocaleDateString()}
                </Title>
                {managerSchedule.id === 0 ? (
                    <View style={styles.info}>
                        <Text>Не заполнен</Text>
                    </View>
                ) : (
                    <View style={styles.info}>
                        <View>
                            <Text>Начало:</Text>
                            <Text>
                                {managerSchedule.startCoordinate.address}
                            </Text>
                        </View>
                        <View>
                            <Text>Часы работы:</Text>
                            <Text>
                                {managerSchedule.startTime.toLocaleTimeString()}{' '}
                                - {managerSchedule.endTime.toLocaleTimeString()}
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};
