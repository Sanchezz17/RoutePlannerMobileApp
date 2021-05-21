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
import AddressIcon from '../icons/AddressIcon';

export interface GooglePlacesInputProps {
    address: string;
    onChangeCoordinate: (newCoordinate: Coordinate) => void;
    mode?: 'flat' | 'outlined' | undefined;
    style?: StyleProp<ViewStyle>;
}

export const GooglePlacesInput = ({
    address,
    onChangeCoordinate,
    mode,
    style,
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
                console.log(`Location: ${JSON.stringify(location)}`);
                if (location) {
                    const newCoordinate: Coordinate = {
                        latitude: location.lat,
                        longitude: location.lng,
                        address: data.description,
                    };
                    console.log(newCoordinate);
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
                label: 'Адрес',
                leftIcon: <AddressIcon />,
                mode: mode,
                style: style,
            }}
        />
    );
};
