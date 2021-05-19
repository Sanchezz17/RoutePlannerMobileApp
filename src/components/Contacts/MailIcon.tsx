import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const MailIcon = ({ style }: IconProps) => (
    <Svg style={style} width="17" height="17" viewBox="0 0 17 17" fill="none">
        <Path
            d="M14.1667 2.83337H2.83335C2.05419 2.83337 1.42377 3.47087 1.42377 4.25004L1.41669 12.75C1.41669 13.5292 2.05419 14.1667 2.83335 14.1667H14.1667C14.9459 14.1667 15.5834 13.5292 15.5834 12.75V4.25004C15.5834 3.47087 14.9459 2.83337 14.1667 2.83337ZM14.1667 12.75H2.83335V5.66671L8.50002 9.20837L14.1667 5.66671V12.75ZM8.50002 7.79171L2.83335 4.25004H14.1667L8.50002 7.79171Z"
            fill={palette.Secondary}
        />
    </Svg>
);

export default MailIcon;
