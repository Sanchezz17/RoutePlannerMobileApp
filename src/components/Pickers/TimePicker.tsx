import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import TimeIcon from '../icons/Inputs/TimeIcon';
import Picker from './Picker';
import styles from './Picker.styles';
interface TimePickerProps {
    style?: StyleProp<ViewStyle>;
    onChange: (event: any, selectedDate: Date | undefined) => void;
    value: Date | undefined;
    title: string;
}

export const TimePicker = ({
    style,
    onChange,
    value,
    title,
}: TimePickerProps) => {
    return (
        <Picker
            title={title}
            mode={'time'}
            onChange={onChange}
            style={style}
            value={value}
            valueToString={(date) => date?.toLocaleTimeString()}
            icon={<TimeIcon style={styles.icon} />}
        />
    );
};
