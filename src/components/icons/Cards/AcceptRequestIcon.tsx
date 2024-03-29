import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

const AcceptRequestIcon = () => (
    <Svg width={40} height={40} viewBox="0 0 33 33" fill="none">
        <Circle
            cx={16.5}
            cy={16.5}
            r={16}
            stroke={palette.Primary}
            strokeOpacity={0.73}
        />
        <Path
            d="M10 15.6l5.25 5.4L24 12"
            stroke={palette.Primary}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default AcceptRequestIcon;
