import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

interface IconProps {
    focused: Boolean;
}

const palette = PaletteStorage.getPalette();
const InfoIcon = ({ focused }: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24">
        <Path
            d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
            fill={focused ? palette.Primary : palette.SystemUI}
        />
    </Svg>
);

export default InfoIcon;
