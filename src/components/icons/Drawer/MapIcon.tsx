import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

interface IconProps {
    focused: Boolean;
}

const palette = PaletteStorage.getPalette();
const MapIcon = ({ focused }: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.78 3.22 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.22 20.78 3 20.5 3ZM15 19L9 16.89V5L15 7.11V19Z"
            fill={focused ? palette.Primary : palette.SystemUI}
        />
    </Svg>
);

export default MapIcon;
