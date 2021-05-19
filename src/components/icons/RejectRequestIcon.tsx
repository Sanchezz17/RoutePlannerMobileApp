import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { PaletteStorage } from '../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
const RejectRequestIcon = () => (
    <Svg width={40} height={40} viewBox="0 0 33 33" fill="none">
        <Circle cx={16.5} cy={16.5} r={16} stroke={palette.SystemUI} />
        <Path
            d="M21.75 12.169l-.919-.919-4.331 4.331-4.331-4.331-.919.919 4.331 4.331-4.331 4.331.919.919 4.331-4.331 4.331 4.331.919-.919-4.331-4.331 4.331-4.331z"
            fill={palette.SystemUI}
        />
    </Svg>
);

export default RejectRequestIcon;
