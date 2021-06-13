import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

interface IconProps {
    focused: Boolean;
}

const palette = PaletteStorage.getPalette();
const ScheduleIcon = ({ focused }: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M15 1H9V3H15V1ZM11 14H13V8H11V14ZM19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13C3 17.97 7.02 22 12 22C16.98 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM12 20C8.13 20 5 16.87 5 13C5 9.13 8.13 6 12 6C15.87 6 19 9.13 19 13C19 16.87 15.87 20 12 20Z"
            fill={focused ? palette.Primary : palette.SystemUI}
        />
    </Svg>
);

export default ScheduleIcon;
