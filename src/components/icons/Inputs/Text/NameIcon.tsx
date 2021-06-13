import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const NameIcon = ({ style }: IconProps) => (
    <Svg style={style} width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path
            d="M11.5 11.5C13.8481 11.5 15.75 9.59812 15.75 7.25C15.75 4.90188 13.8481 3 11.5 3C9.15188 3 7.25 4.90188 7.25 7.25C7.25 9.59812 9.15188 11.5 11.5 11.5ZM11.5 13.625C8.66313 13.625 3 15.0487 3 17.875V20H20V17.875C20 15.0487 14.3369 13.625 11.5 13.625Z"
            fill={palette.Secondary}
        />
    </Svg>
);

export default NameIcon;
