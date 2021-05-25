import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Coordinate } from '../../redux/users/types';
import { GooglePlacesInput } from '../GooglePlacesInput/GooglePlacesInput';
import LocationIcon from '../icons/LocationIcon';
import styles from './LocationPicker.styles';

interface LocationPickerProps {
    style?: StyleProp<ViewStyle>;
    address?: string;
    onChange: (newCoordinate: Coordinate) => void;
    label: string;
}

export const LocationPicker = ({
    style,
    address,
    onChange,
    label,
}: LocationPickerProps) => {
    return (
        <View style={styles.view}>
            <GooglePlacesInput
                address={address ?? ''}
                onChangeCoordinate={onChange}
                style={styles.input}
                label={label}
                showLeftIcon={false}
                showRightIcon={true}
            />
        </View>
    );
};
