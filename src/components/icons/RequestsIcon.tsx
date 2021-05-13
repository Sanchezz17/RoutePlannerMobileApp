import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PaletteStorage } from '../palette/PaletteStorage';

interface IconProps {
    focused: Boolean;
}

const palette = PaletteStorage.getPalette();
const RequestsIcon = ({ focused }: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM6 10V7H4V10H1V12H4V15H6V12H9V10H6ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14Z"
            fill={focused ? palette.Primary : palette.SystemUI}
        />
    </Svg>
);

export default RequestsIcon;