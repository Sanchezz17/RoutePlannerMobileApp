import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    Platform,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Text } from 'react-native-paper';

import styles from './Picker.styles';

interface PickerProps {
    style?: StyleProp<ViewStyle>;
    onChange: (event: any, selectedDate: Date | undefined) => void;
    value: Date | undefined;
    title: string;
    mode: 'date' | 'time';
    valueToString: (date: Date | undefined) => string | undefined;
    icon: Element;
}

const Picker = ({
    style,
    onChange,
    value,
    title,
    mode,
    valueToString,
    icon,
}: PickerProps) => {
    const [show, setShow] = useState(false);

    return (
        <View style={[style, styles.view]}>
            <TouchableOpacity
                style={styles.touchableContainer}
                onPress={() => setShow(true)}>
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>
                        {valueToString(value) ?? 'Не назначено'}
                    </Text>
                </View>
                <View style={styles.iconContainer}>{icon}</View>
                {show && (
                    <DateTimePicker
                        style={styles.picker}
                        value={value ?? new Date()}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={(
                            event: any,
                            selectedDate: Date | undefined,
                        ) => {
                            setShow(Platform.OS === 'ios');
                            onChange(event, selectedDate);
                        }}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default Picker;
