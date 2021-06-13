import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const BackIcon = ({ style }: IconProps) => (
    <Svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
            fill={palette.SystemUI}
        />
    </Svg>
);

export default BackIcon;
