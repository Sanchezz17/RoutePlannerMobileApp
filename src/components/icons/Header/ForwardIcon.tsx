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
            d="M4 13H16.17L10.58 18.59L12 20L20 12L12 4L10.59 5.41L16.17 11H4V13Z"
            fill={palette.SystemUI}
        />
    </Svg>
);

export default BackIcon;
