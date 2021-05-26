import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();

const LocationIcon = ({ style }: IconProps) => (
    <Svg style={style} width="36" height="36" viewBox="0 0 36 36" fill="none">
        <Path
            d="M18 3C12.195 3 7.5 7.695 7.5 13.5C7.5 21.375 18 33 18 33C18 33 28.5 21.375 28.5 13.5C28.5 7.695 23.805 3 18 3ZM18 17.25C15.93 17.25 14.25 15.57 14.25 13.5C14.25 11.43 15.93 9.75 18 9.75C20.07 9.75 21.75 11.43 21.75 13.5C21.75 15.57 20.07 17.25 18 17.25Z"
            fill={palette.Primary}
            fill-opacity="0.73"
        />
    </Svg>
);

export default LocationIcon;
