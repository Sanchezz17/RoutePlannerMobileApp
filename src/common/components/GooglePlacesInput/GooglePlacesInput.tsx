import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
]);

import React, {useEffect, useRef} from 'react';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

export interface GooglePlacesInputProps {
  address: string;
  onChange: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void;
}

export const GooglePlacesInput = ({
  address,
  onChange,
}: GooglePlacesInputProps) => {
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    ref.current?.setAddressText(address);
  }, [address]);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder=""
      fetchDetails={true}
      onPress={(data, detail) => {
        onChange(data, detail);
        ref.current?.setAddressText(data.description);
      }}
      enablePoweredByContainer={false}
      query={{
        key: '',
        language: 'ru',
      }}
    />
  );
};
