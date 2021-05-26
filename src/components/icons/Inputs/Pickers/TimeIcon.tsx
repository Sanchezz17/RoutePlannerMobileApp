import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();

const TimeIcon = ({ style }: IconProps) => (
    <Svg style={style} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <Path
            d="M15.9866 2.66675C8.62663 2.66675 2.66663 8.64008 2.66663 16.0001C2.66663 23.3601 8.62663 29.3334 15.9866 29.3334C23.36 29.3334 29.3333 23.3601 29.3333 16.0001C29.3333 8.64008 23.36 2.66675 15.9866 2.66675ZM16 26.6667C10.1066 26.6667 5.33329 21.8934 5.33329 16.0001C5.33329 10.1067 10.1066 5.33341 16 5.33341C21.8933 5.33341 26.6666 10.1067 26.6666 16.0001C26.6666 21.8934 21.8933 26.6667 16 26.6667Z"
            fill={palette.Primary}
            fill-opacity="0.73"
        />
        <Path
            d="M16.6666 9.33325H14.6666V17.3333L21.6666 21.5333L22.6666 19.8933L16.6666 16.3333V9.33325Z"
            fill={palette.Primary}
            fill-opacity="0.73"
        />
    </Svg>
);

export default TimeIcon;
