import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();
const TelegramIcon = ({ style }: IconProps) => (
    <Svg style={style} width="17" height="17" viewBox="0 0 17 17" fill="none">
        <Path
            d="M15.2702 2.20822C15.1421 2.09759 14.9862 2.02412 14.8193 1.99577C14.6525 1.96742 14.4811 1.98527 14.3236 2.04739L2.06789 6.86217C1.88096 6.9356 1.72284 7.06759 1.61718 7.23838C1.51152 7.40918 1.46401 7.6096 1.48176 7.80965C1.49951 8.0097 1.58156 8.19862 1.71563 8.34815C1.84971 8.49767 2.0286 8.59976 2.22554 8.63913L5.44532 9.28301V13.2802C5.44512 13.4642 5.49954 13.644 5.60167 13.7971C5.70379 13.9501 5.84904 14.0693 6.019 14.1397C6.18896 14.2101 6.376 14.2285 6.55641 14.1925C6.73681 14.1565 6.90248 14.0678 7.03242 13.9376L8.84326 12.1267L11.5516 14.5101C11.7201 14.6597 11.9374 14.7424 12.1627 14.7427C12.2606 14.7425 12.3579 14.7271 12.4511 14.6969C12.6048 14.6482 12.743 14.56 12.8519 14.4412C12.9609 14.3224 13.0367 14.1771 13.072 14.0198L15.5697 3.12031C15.6078 2.95541 15.6 2.78325 15.5472 2.62247C15.4944 2.46168 15.3986 2.31841 15.2703 2.20815L15.2702 2.20822ZM2.27555 7.7392C2.27124 7.7104 2.27729 7.681 2.29261 7.65624C2.30792 7.63147 2.33153 7.61294 2.35922 7.60393L12.6143 3.57513L5.75138 8.53162L2.3818 7.85767C2.35293 7.85369 2.32641 7.8396 2.30696 7.8179C2.2875 7.79621 2.27637 7.76832 2.27555 7.7392ZM6.4689 13.3742C6.45033 13.3927 6.42666 13.4054 6.4009 13.4105C6.37515 13.4156 6.34845 13.413 6.32418 13.4029C6.29992 13.3929 6.27918 13.3759 6.26458 13.354C6.24999 13.3322 6.2422 13.3065 6.24219 13.2803V9.83777L8.24387 11.5993L6.4689 13.3742ZM12.2953 13.8418C12.2901 13.8642 12.2793 13.885 12.2637 13.9019C12.2482 13.9189 12.2285 13.9315 12.2066 13.9386C12.1847 13.9457 12.1613 13.9469 12.1388 13.9423C12.1162 13.9376 12.0953 13.9271 12.078 13.9119L6.48172 8.98717L14.7814 2.99294L12.2953 13.8418Z"
            fill={palette.Secondary}
        />
    </Svg>
);

export default TelegramIcon;
