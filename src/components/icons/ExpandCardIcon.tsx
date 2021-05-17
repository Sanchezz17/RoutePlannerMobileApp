import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PaletteStorage } from '../palette/PaletteStorage';
import { StyleProp, ViewStyle} from 'react-native';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const ExpandCardIcon = ({ style }: IconProps) => {
    return (
        <Svg
            style={style}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none">
            <Path
                d="M16.59 8.58997L12 13.17L7.41 8.58997L6 9.99997L12 16L18 9.99997L16.59 8.58997Z"
                fill={palette.SystemUI}
            />
        </Svg>
    );
};

export default ExpandCardIcon;
