import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PaletteStorage } from '../palette/PaletteStorage';
import { StyleProp, ViewStyle } from 'react-native';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const PhoneIcon = ({ style }: IconProps) => (
    <Svg style={style} width="17" height="17" viewBox="0 0 17 17" fill="none">
        <Path
            d="M4.68917 7.64292C5.70917 9.6475 7.3525 11.2837 9.35708 12.3108L10.9154 10.7525C11.1067 10.5612 11.39 10.4975 11.6379 10.5825C12.4312 10.8446 13.2883 10.9862 14.1667 10.9862C14.5562 10.9862 14.875 11.305 14.875 11.6946V14.1667C14.875 14.5562 14.5562 14.875 14.1667 14.875C7.51542 14.875 2.125 9.48458 2.125 2.83333C2.125 2.44375 2.44375 2.125 2.83333 2.125H5.3125C5.70208 2.125 6.02083 2.44375 6.02083 2.83333C6.02083 3.71875 6.1625 4.56875 6.42458 5.36208C6.5025 5.61 6.44583 5.88625 6.2475 6.08458L4.68917 7.64292Z"
            fill={palette.Secondary}
        />
    </Svg>
);

export default PhoneIcon;
