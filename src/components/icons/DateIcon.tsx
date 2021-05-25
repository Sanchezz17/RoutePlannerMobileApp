import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();

const DateIcon = ({ style }: IconProps) => (
    <Svg style={style} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <Path
            d="M12.4138 14.2068H9.74715V16.8735H12.4138V14.2068ZM17.7472 14.2068H15.0805V16.8735H17.7472V14.2068ZM23.0805 14.2068H20.4138V16.8735H23.0805V14.2068ZM25.7472 4.87345H24.4138V2.20679H21.7472V4.87345H11.0805V2.20679H8.41382V4.87345H7.08049C5.60049 4.87345 4.42715 6.07345 4.42715 7.54012L4.41382 26.2068C4.41382 27.6735 5.60049 28.8735 7.08049 28.8735H25.7472C27.2138 28.8735 28.4138 27.6735 28.4138 26.2068V7.54012C28.4138 6.07345 27.2138 4.87345 25.7472 4.87345ZM25.7472 26.2068H7.08049V11.5401H25.7472V26.2068Z"
            fill={palette.Primary}
            fill-opacity="0.73"
        />
    </Svg>
);

export default DateIcon;
