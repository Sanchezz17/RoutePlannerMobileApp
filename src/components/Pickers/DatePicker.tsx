import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Picker from './Picker';
interface DatePickerProps {
    style?: StyleProp<ViewStyle>;
    onChange: (event: any, selectedDate: Date | undefined) => void;
    value: Date | undefined;
    message: string;
}

export const DatePicker = ({
    style,
    onChange,
    value,
    message,
}: DatePickerProps) => {
    return (
        <Picker
            message={message}
            mode={'date'}
            onChange={onChange}
            style={style}
            value={value}
            valueToString={(date) => date?.toLocaleDateString()}
        />
    );
};
