import { LogBox, StyleProp, ViewStyle } from 'react-native';

LogBox.ignoreLogs([
    /VirtualizedLists should never be nested inside plain ScrollViews with the same orientation.*/,
]);

import React, { useEffect, useRef } from 'react';
import {
    GooglePlacesAutocomplete,
    GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import { GoogleMapsApiKey } from '../../common/secrets';
import TextInput from '../../components/TextInput/TextInput';
import { Coordinate } from '../../redux/users/types';
import AddressIcon from '../icons/Inputs/AddressIcon';
import LocationIcon from '../icons/Inputs/LocationIcon';

export interface GooglePlacesInputProps {
    address: string;
    onChangeCoordinate: (newCoordinate: Coordinate) => void;
    mode?: 'flat' | 'outlined' | undefined;
    style?: StyleProp<ViewStyle>;
    label?: string;
    showLeftIcon?: boolean;
    showRightIcon?: boolean;
    showUnderline?: boolean;
}

export const GooglePlacesInput = ({
    address,
    onChangeCoordinate,
    mode,
    style,
    label,
    showLeftIcon = true,
    showRightIcon = false,
    showUnderline = true,
}: GooglePlacesInputProps) => {
    const ref = useRef<GooglePlacesAutocompleteRef>(null);

    useEffect(() => {
        ref.current?.setAddressText(address);
    }, [address, onChangeCoordinate]);

    return (
        <GooglePlacesAutocomplete
            ref={ref}
            placeholder=""
            fetchDetails={true}
            onPress={(data, detail) => {
                const location = detail?.geometry?.location;
                if (location) {
                    const newCoordinate: Coordinate = {
                        latitude: location.lat,
                        longitude: location.lng,
                        address: data.description,
                    };
                    onChangeCoordinate(newCoordinate);
                    ref.current?.setAddressText(data.description);
                }
            }}
            enablePoweredByContainer={false}
            query={{
                key: GoogleMapsApiKey,
                language: 'ru',
            }}
            textInputProps={{
                InputComp: TextInput,
                label: label ?? 'Адрес',
                leftIcon: showLeftIcon ? <AddressIcon /> : '',
                rightIcon: showRightIcon ? <LocationIcon /> : '',
                mode: mode,
                style: style,
                showUnderline: showUnderline,
            }}
        />
    );
};
