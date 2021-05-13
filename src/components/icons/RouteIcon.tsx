import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PaletteStorage } from '../palette/PaletteStorage';

interface IconProps {
    focused: Boolean;
}

const palette = PaletteStorage.getPalette();
const RouteIcon = ({ focused }: IconProps) => (
    <Svg width="22" height="12" viewBox="0 0 22 12" fill="none">
        <Path
            d="M22 2C22 3.1 21.1 4 20 4C19.82 4 19.65 3.98 19.49 3.93L15.93 7.48C15.98 7.64 16 7.82 16 8C16 9.1 15.1 10 14 10C12.9 10 12 9.1 12 8C12 7.82 12.02 7.64 12.07 7.48L9.52 4.93C9.36 4.98 9.18 5 9 5C8.82 5 8.64 4.98 8.48 4.93L3.93 9.49C3.98 9.65 4 9.82 4 10C4 11.1 3.1 12 2 12C0.9 12 0 11.1 0 10C0 8.9 0.9 8 2 8C2.18 8 2.35 8.02 2.51 8.07L7.07 3.52C7.02 3.36 7 3.18 7 3C7 1.9 7.9 1 9 1C10.1 1 11 1.9 11 3C11 3.18 10.98 3.36 10.93 3.52L13.48 6.07C13.64 6.02 13.82 6 14 6C14.18 6 14.36 6.02 14.52 6.07L18.07 2.51C18.02 2.35 18 2.18 18 2C18 0.9 18.9 0 20 0C21.1 0 22 0.9 22 2Z"
            fill={focused ? palette.Primary : palette.SystemUI}
        />
    </Svg>
);

export default RouteIcon;
