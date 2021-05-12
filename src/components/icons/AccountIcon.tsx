import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Palette } from '../palette/Palette';

interface IconProps {
    focused: Boolean;
}

const palette = new Palette();
const AccountIcon = ({ focused }: IconProps) => (
    <Svg width="84" height="84" viewBox="0 0 84 84" fill="none">
        <Path
            d="M75 42C75 60.2254 60.2254 75 42 75C23.7746 75 9 60.2254 9 42C9 23.7746 23.7746 9 42 9C60.2254 9 75 23.7746 75 42Z"
            fill={focused ? palette.Primary : palette.SystemUI}
        />
        <Path
            d="M42 7C22.68 7 7 22.68 7 42C7 61.32 22.68 77 42 77C61.32 77 77 61.32 77 42C77 22.68 61.32 7 42 7ZM42 17.5C47.81 17.5 52.5 22.19 52.5 28C52.5 33.81 47.81 38.5 42 38.5C36.19 38.5 31.5 33.81 31.5 28C31.5 22.19 36.19 17.5 42 17.5ZM42 67.2C33.25 67.2 25.515 62.72 21 55.93C21.105 48.965 35 45.15 42 45.15C48.965 45.15 62.895 48.965 63 55.93C58.485 62.72 50.75 67.2 42 67.2Z"
            fill={focused ? palette.Primary : palette.SystemUI}
        />
    </Svg>
);

export default AccountIcon;
