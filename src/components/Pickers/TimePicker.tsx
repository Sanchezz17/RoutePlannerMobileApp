import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Picker from './Picker';

interface TimePickerProps {
    style?: StyleProp<ViewStyle>;
    onChange: (event: any, selectedDate: Date | undefined) => void;
    value: Date | undefined;
    message: string;
}

export const TimePicker = ({
    style,
    onChange,
    value,
    message,
}: TimePickerProps) => {
    return (
        <Picker
            message={message}
            mode={'time'}
            onChange={onChange}
            style={style}
            value={value}
            valueToString={(date) => date?.toLocaleTimeString()}
        />
    );
};
