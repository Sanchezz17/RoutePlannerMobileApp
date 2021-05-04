import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
]);

import React, { useEffect, useRef } from 'react';
import {
    GooglePlacesAutocomplete,
    GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { Coordinate } from '../../redux/users/types';

export interface GooglePlacesInputProps {
    address: string;
    onChangeCoordinate: (newCoordinate: Coordinate) => void;
}

export const GooglePlacesInput = ({
    address,
    onChangeCoordinate,
}: GooglePlacesInputProps) => {
    const ref = useRef<GooglePlacesAutocompleteRef>(null);

    useEffect(() => {
        if (address) {
            ref.current?.setAddressText(address);
        }
    }, [address]);

    return (
        <GooglePlacesAutocomplete
            ref={ref}
            placeholder=""
            fetchDetails={true}
            onPress={(data, detail) => {
                //console.log(data);
                //console.log(detail);
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
                key: '',
                language: 'ru',
            }}
            styles={{
                textInput: {
                    borderColor: '#000000',
                    borderWidth: 2,
                },
            }}
        />
    );
};
