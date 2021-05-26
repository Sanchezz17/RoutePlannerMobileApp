import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import DateIcon from '../icons/Inputs/DateIcon';
import Picker from './Picker';
import styles from './Picker.styles';
interface DatePickerProps {
    style?: StyleProp<ViewStyle>;
    onChange: (event: any, selectedDate: Date | undefined) => void;
    value: Date | undefined;
    title: string;
}

export const DatePicker = ({
    style,
    onChange,
    value,
    title,
}: DatePickerProps) => {
    return (
        <Picker
            title={title}
            mode={'date'}
            onChange={onChange}
            style={style}
            value={value}
            valueToString={(date) => date?.toLocaleDateString()}
            icon={<DateIcon style={styles.icon} />}
        />
    );
};
