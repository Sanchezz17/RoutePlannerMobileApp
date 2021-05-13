import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PaletteStorage } from '../palette/PaletteStorage';
import { StyleProp, ViewStyle } from 'react-native';

interface IconProps {
    size: String;
    style: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const AccountIcon = ({ size, style }: IconProps) => {
    if (size === 'big') {
        return (
            <Svg
                style={style}
                width="84"
                height="84"
                viewBox="0 0 84 84"
                fill="none">
                <Path
                    d="M75 42C75 60.2254 60.2254 75 42 75C23.7746 75 9 60.2254 9 42C9 23.7746 23.7746 9 42 9C60.2254 9 75 23.7746 75 42Z"
                    fill={palette.Primary}
                />
                <Path
                    d="M42 0C18.816 0 0 18.816 0 42C0 65.184 18.816 84 42 84C65.184 84 84 65.184 84 42C84 18.816 65.184 0 42 0ZM42 12.6C48.972 12.6 54.6 18.228 54.6 25.2C54.6 32.172 48.972 37.8 42 37.8C35.028 37.8 29.4 32.172 29.4 25.2C29.4 18.228 35.028 12.6 42 12.6ZM42 72.24C31.5 72.24 22.218 66.864 16.8 58.716C16.926 50.358 33.6 45.78 42 45.78C50.358 45.78 67.074 50.358 67.2 58.716C61.782 66.864 52.5 72.24 42 72.24Z"
                    fill={palette.SystemUISecondary}
                />
            </Svg>
        );
    } else if (size === 'medium') {
        return (
            <Svg
                style={style}
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none">
                <Path
                    d="M55 31C55 44.2548 44.2548 55 31 55C17.7452 55 7 44.2548 7 31C7 17.7452 17.7452 7 31 7C44.2548 7 55 17.7452 55 31Z"
                    fill={palette.Primary}
                />
                <Path
                    d="M31 0C13.888 0 0 13.888 0 31C0 48.112 13.888 62 31 62C48.112 62 62 48.112 62 31C62 13.888 48.112 0 31 0ZM31 9.3C36.146 9.3 40.3 13.454 40.3 18.6C40.3 23.746 36.146 27.9 31 27.9C25.854 27.9 21.7 23.746 21.7 18.6C21.7 13.454 25.854 9.3 31 9.3ZM31 53.32C23.25 53.32 16.399 49.352 12.4 43.338C12.493 37.169 24.8 33.79 31 33.79C37.169 33.79 49.507 37.169 49.6 43.338C45.601 49.352 38.75 53.32 31 53.32Z"
                    fill={palette.SystemUISecondary}
                />
            </Svg>
        );
    } else if (size === 'small') {
        return (
            <Svg
                style={style}
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none">
                <Path
                    d="M44 23.5C44 34.8218 34.8218 44 23.5 44C12.1782 44 3 34.8218 3 23.5C3 12.1782 12.1782 3 23.5 3C34.8218 3 44 12.1782 44 23.5Z"
                    fill={palette.Primary}
                />
                <Path
                    d="M23.4146 0C10.4898 0 0 10.752 0 24C0 37.248 10.4898 48 23.4146 48C36.3395 48 46.8293 37.248 46.8293 24C46.8293 10.752 36.3395 0 23.4146 0ZM23.4146 7.2C27.3015 7.2 30.439 10.416 30.439 14.4C30.439 18.384 27.3015 21.6 23.4146 21.6C19.5278 21.6 16.3902 18.384 16.3902 14.4C16.3902 10.416 19.5278 7.2 23.4146 7.2ZM23.4146 41.28C17.561 41.28 12.3863 38.208 9.36585 33.552C9.4361 28.776 18.7317 26.16 23.4146 26.16C28.0741 26.16 37.3932 28.776 37.4634 33.552C34.4429 38.208 29.2683 41.28 23.4146 41.28Z"
                    fill={palette.SystemUISecondary}
                />
            </Svg>
        );
    }
    return <></>;
};

export default AccountIcon;
