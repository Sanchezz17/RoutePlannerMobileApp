import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const SearсhIcon = ({ style }: IconProps) => (
    <Svg style={style} width="18" height="18" viewBox="0 0 18 18" fill="none">
        <Path
            d="M13.01 11.2549H12.22L11.94 10.9849C12.92 9.84488 13.51 8.36488 13.51 6.75488C13.51 3.16488 10.6 0.254883 7.01001 0.254883C3.42001 0.254883 0.51001 3.16488 0.51001 6.75488C0.51001 10.3449 3.42001 13.2549 7.01001 13.2549C8.62001 13.2549 10.1 12.6649 11.24 11.6849L11.51 11.9649V12.7549L16.51 17.7449L18 16.2549L13.01 11.2549ZM7.01001 11.2549C4.52001 11.2549 2.51001 9.24488 2.51001 6.75488C2.51001 4.26488 4.52001 2.25488 7.01001 2.25488C9.50001 2.25488 11.51 4.26488 11.51 6.75488C11.51 9.24488 9.50001 11.2549 7.01001 11.2549Z"
            fill={palette.SystemUI}
        />
    </Svg>
);

export default SearсhIcon;
