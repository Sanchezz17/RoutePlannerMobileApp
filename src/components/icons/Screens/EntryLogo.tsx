import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const LogoIcon = ({ style }: IconProps) => (
    <Svg
        style={style}
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none">
        <G clip-path="url(#clip0)">
            <Path
                d="M37.1427 48.6475L34.7786 140.786C34.7786 140.786 91.5867 77.7826 91.5111 78.03C91.4354 78.2775 59.9622 75.4744 59.9622 75.4744"
                fill="#6200EE"
            />
            <Path
                d="M44.2546 29.7021C33.4775 15.5633 23.5475 21.9317 21.7525 24.0121C5.24583 43.1421 49.7725 101.507 115.639 142.727C122.075 146.755 107.378 104.869 75.0325 66.4292"
                stroke="#606060"
                stroke-width="5"
            />
            <Path
                d="M23.3046 28.647C26.8325 28.647 29.6925 25.7871 29.6925 22.2591C29.6925 18.7312 26.8325 15.8712 23.3046 15.8712C19.7766 15.8712 16.9167 18.7312 16.9167 22.2591C16.9167 25.7871 19.7766 28.647 23.3046 28.647Z"
                fill="#6200EE"
            />
            <Path
                d="M114.863 146.328C118.391 146.328 121.251 143.468 121.251 139.94C121.251 136.412 118.391 133.552 114.863 133.552C111.335 133.552 108.475 136.412 108.475 139.94C108.475 143.468 111.335 146.328 114.863 146.328Z"
                fill="#6200EE"
            />
            <Path
                d="M97.0167 13.4655C92.6013 10.4087 87.627 8.25144 82.3779 7.11701C77.1288 5.98257 71.7076 5.89314 66.424 6.85381C61.1403 7.81448 56.0976 9.80644 51.5837 12.716C47.0699 15.6255 43.1733 19.3956 40.1165 23.811C37.0596 28.2264 34.9024 33.2007 33.768 38.4498C32.6336 43.6989 32.5441 49.12 33.5048 54.4037C34.4655 59.6874 36.4574 64.7301 39.3669 69.244C42.2765 73.7578 46.0466 77.6544 50.462 80.7112C59.3793 86.8847 70.3838 89.263 81.0547 87.3229C91.7256 85.3827 101.189 79.2831 107.362 70.3657C113.536 61.4484 115.914 50.4438 113.974 39.773C112.034 29.1021 105.934 19.639 97.0167 13.4655ZM81.7749 35.4814C84.8533 37.6126 86.959 40.8793 87.6287 44.563C88.2985 48.2467 87.4775 52.0456 85.3463 55.1239C83.2151 58.2023 79.9484 60.308 76.2647 60.9777C72.581 61.6475 68.7821 60.8265 65.7038 58.6953C62.6254 56.5641 60.5197 53.2974 59.85 49.6137C59.1802 45.93 60.0012 42.1311 62.1324 39.0528C64.2636 35.9744 67.5303 33.8687 71.214 33.199C74.8977 32.5292 78.6966 33.3502 81.7749 35.4814Z"
                fill="#6200EE"
            />
        </G>
        <Defs>
            <ClipPath id="clip0">
                <Rect width="150" height="150" fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

export default LogoIcon;
