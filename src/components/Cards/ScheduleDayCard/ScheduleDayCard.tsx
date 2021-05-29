import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text, Title } from 'react-native-paper';

import {
    DAY_MILLISECONDS,
    getTimeString,
} from '../../../common/utils/dateUtils';
import { ManagerSchedule } from '../../../redux/schedule/types';
import AlertIcon from '../../icons/Cards/AlertIcon';
import styles from './ScheduleDayCard.styles';

export interface ScheduleDayCardProps {
    managerSchedule: ManagerSchedule;
    style?: StyleProp<ViewStyle>;
    dayOfWeek: number;
    weekStart: Date;
    onPress: () => void;
}

export const ScheduleDayCard = ({
    managerSchedule,
    style,
    dayOfWeek,
    weekStart,
    onPress,
}: ScheduleDayCardProps) => {
    return (
        <View style={[style, styles.card]}>
            <TouchableOpacity style={styles.touchable} onPress={onPress}>
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
                    <View style={styles.infos}>
                        <Text style={styles.notFilledText}>Не заполнен</Text>
                    </View>
                ) : (
                    <View style={styles.infos}>
                        <View style={styles.info}>
                            <Text style={styles.infoHeader}>Начало:</Text>
                            <Text>
                                {managerSchedule.startCoordinate.address}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoHeader}>Часы работы:</Text>
                            <Text style={styles.time}>
                                {getTimeString(managerSchedule.startTime)} -{' '}
                                {getTimeString(managerSchedule.endTime)}
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};
