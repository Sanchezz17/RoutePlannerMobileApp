import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const HamburgerMenuIcon = ({ style }: IconProps) => (
    <Svg style={style} width="56" height="56" viewBox="0 0 56 56" fill="none">
        <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19 24V22H37V24H19ZM19 29H37V27H19V29ZM19 34H37V32H19V34Z"
            fill={palette.SystemUI}
        />
    </Svg>
);

export default HamburgerMenuIcon;
