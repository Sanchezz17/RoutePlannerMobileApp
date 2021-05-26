import React, { useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Coordinate } from '../../redux/users/types';
import { GooglePlacesInput } from '../GooglePlacesInput/GooglePlacesInput';
import styles from './LocationPicker.styles';

interface LocationPickerProps {
    style?: StyleProp<ViewStyle>;
    initialCoordinate?: Coordinate;
    onChange: (newCoordinate: Coordinate) => void;
    label: string;
}

export const LocationPicker = ({
    style,
    initialCoordinate,
    onChange,
    label,
}: LocationPickerProps) => {
    const [coordinate, setCoordinate] = useState<Coordinate>(
        initialCoordinate ?? { address: '', latitude: 0, longitude: 0 },
    );
    return (
        <View style={styles.view}>
            <GooglePlacesInput
                address={coordinate?.address}
                onChangeCoordinate={(newCoordinate) => {
                    setCoordinate(newCoordinate);
                    onChange(newCoordinate);
                }}
                style={styles.input}
                label={label}
                showLeftIcon={false}
                showRightIcon={true}
                showUnderline={false}
            />
        </View>
    );
};
