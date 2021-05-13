import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PaletteStorage } from '../palette/PaletteStorage';

interface IconProps {
    focused: Boolean;
    size: String;
}

const palette = PaletteStorage.getPalette();
const AccountIcon = ({ focused, size }: IconProps) =>
    size === 'big' ? (
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
    ) : (
        <Svg width="35" height="35" viewBox="0 0 35 35" fill="none">
            <Path
                d="M17.5 0.416748C8.07002 0.416748 0.416687 8.07008 0.416687 17.5001C0.416687 26.9301 8.07002 34.5834 17.5 34.5834C26.93 34.5834 34.5834 26.9301 34.5834 17.5001C34.5834 8.07008 26.93 0.416748 17.5 0.416748ZM17.5 5.54175C20.3359 5.54175 22.625 7.83091 22.625 10.6667C22.625 13.5026 20.3359 15.7917 17.5 15.7917C14.6642 15.7917 12.375 13.5026 12.375 10.6667C12.375 7.83091 14.6642 5.54175 17.5 5.54175ZM17.5 29.8001C13.2292 29.8001 9.45377 27.6134 7.25002 24.2992C7.30127 20.8997 14.0834 19.0376 17.5 19.0376C20.8996 19.0376 27.6988 20.8997 27.75 24.2992C25.5463 27.6134 21.7709 29.8001 17.5 29.8001Z"
                fill="#808080"
            />
        </Svg>
    );

export default AccountIcon;
