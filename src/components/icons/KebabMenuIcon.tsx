import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const KebabMenuIcon = ({ style }: IconProps) => (
    <Svg style={style} width="36" height="36" viewBox="0 0 36 36" fill="none">
        <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14ZM18 16C16.9 16 16 16.9 16 18C16 19.1 16.9 20 18 20C19.1 20 20 19.1 20 18C20 16.9 19.1 16 18 16ZM16 24C16 22.9 16.9 22 18 22C19.1 22 20 22.9 20 24C20 25.1 19.1 26 18 26C16.9 26 16 25.1 16 24Z"
            fill={palette.SystemUI}
        />
    </Svg>
);

export default KebabMenuIcon;
