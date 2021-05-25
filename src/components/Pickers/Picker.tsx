import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, Platform, StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

interface PickerProps {
    style?: StyleProp<ViewStyle>;
    onChange: (event: any, selectedDate: Date | undefined) => void;
    value: Date | undefined;
    message: string;
    mode: 'date' | 'time';
    valueToString: (date: Date | undefined) => string | undefined;
}

const Picker = ({
    style,
    onChange,
    value,
    message,
    mode,
    valueToString,
}: PickerProps) => {
    const [show, setShow] = useState(false);

    return (
        <View style={style}>
            <View>
                <Text>{message}</Text>
                <Text>{valueToString(value) ?? 'Не назначено'}</Text>
                <Button title={'pick'} onPress={() => setShow(true)} />
            </View>
            {show && (
                <DateTimePicker
                    value={value ?? new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={(event: any, selectedDate: Date | undefined) => {
                        setShow(Platform.OS === 'ios');
                        onChange(event, selectedDate);
                    }}
                />
            )}
        </View>
    );
};

export default Picker;
